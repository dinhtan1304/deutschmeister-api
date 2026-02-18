import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { SearchWordsDto, RandomWordsDto } from './dto/words.dto';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async search(dto: SearchWordsDto) {
    const { search, gender, category, level, page = 1, limit = 20 } = dto;
    const where: Prisma.WordWhereInput = {};

    if (search) {
      where.OR = [
        { word: { contains: search, mode: 'insensitive' } },
        { translationEn: { contains: search, mode: 'insensitive' } },
        { translationVi: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (gender) where.gender = gender;
    if (category) where.category = category;
    if (level) where.level = level;

    const [data, total] = await Promise.all([
      this.prisma.word.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { word: 'asc' },
      }),
      this.prisma.word.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    const word = await this.prisma.word.findUnique({ where: { id } });
    if (!word) throw new NotFoundException('Word not found');
    return word;
  }

  /**
   * OPTIMIZED: Get random words using database-level sampling
   * Trước: Load TẤT CẢ words vào memory rồi shuffle
   * Sau: Sử dụng TABLESAMPLE hoặc 2-phase query
   * 
   * Approach: Use a 2-phase query to avoid loading all rows
   * Phase 1: Get total count matching filters
   * Phase 2: Get random offset positions and fetch those specific rows
   */
  async getRandom(dto: RandomWordsDto) {
    const { count = 10, gender, category, levels } = dto;
    const where: Prisma.WordWhereInput = {};

    if (gender) where.gender = gender;
    if (category) where.category = category;
    if (levels?.length) where.level = { in: levels };

    // Phase 1: Get total count
    const totalCount = await this.prisma.word.count({ where });

    if (totalCount === 0) {
      return [];
    }

    if (totalCount <= count) {
      // If we need all or more than available, just return all shuffled
      const words = await this.prisma.word.findMany({ where });
      return this.shuffleArray(words);
    }

    // Phase 2: Generate random unique offsets and fetch
    const randomOffsets = this.generateUniqueRandomNumbers(count, totalCount);

    // Fetch words at random positions using skip/take
    // This is more efficient than loading all into memory
    const words = await Promise.all(
      randomOffsets.map((offset) =>
        this.prisma.word.findFirst({
          where,
          skip: offset,
          take: 1,
        }),
      ),
    );

    // Filter out any nulls (shouldn't happen but safe)
    return words.filter((w): w is NonNullable<typeof w> => w !== null);
  }

  /**
   * Fisher-Yates shuffle algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate n unique random numbers in range [0, max)
   */
  private generateUniqueRandomNumbers(n: number, max: number): number[] {
    const numbers = new Set<number>();
    while (numbers.size < n) {
      numbers.add(Math.floor(Math.random() * max));
    }
    return Array.from(numbers);
  }

  async getStats() {
    const [total, byGender, byCategory, byLevel] = await Promise.all([
      this.prisma.word.count(),
      this.prisma.word.groupBy({ by: ['gender'], _count: { id: true } }),
      this.prisma.word.groupBy({ by: ['category'], _count: { id: true } }),
      this.prisma.word.groupBy({ by: ['level'], _count: { id: true } }),
    ]);

    return {
      total,
      byGender: byGender.map(g => ({ gender: g.gender, count: g._count.id })),
      byCategory: byCategory.map(c => ({ category: c.category, count: c._count.id })),
      byLevel: byLevel.map(l => ({ level: l.level, count: l._count.id })),
    };
  }

  async getLevelIndex(): Promise<Record<string, string>> {
    const words = await this.prisma.word.findMany({
      select: {
        word: true,
        level: true,
      },
    });

    const index: Record<string, string> = {};
    for (const w of words) {
      if (w.word && w.level) {
        index[w.word.toLowerCase()] = w.level;
      }
    }

    return index;
  }
}