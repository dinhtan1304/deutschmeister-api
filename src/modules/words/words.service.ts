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

  async getRandom(dto: RandomWordsDto) {
    const { count = 10, gender, category, levels } = dto;
    const where: Prisma.WordWhereInput = {};

    if (gender) where.gender = gender;
    if (category) where.category = category;
    if (levels?.length) where.level = { in: levels };

    const words = await this.prisma.word.findMany({ where });
    
    // Shuffle and return
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
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
}
