import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';

export interface SubmitFeedbackDto {
  type: 'bug' | 'suggestion' | 'other';
  content: string;
  pageUrl?: string;
}

@Injectable()
export class FeedbackService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private config: ConfigService,
  ) {}

  async submit(dto: SubmitFeedbackDto, userId?: string) {
    const feedback = await this.prisma.feedback.create({
      data: {
        type: dto.type,
        content: dto.content,
        pageUrl: dto.pageUrl,
        userId: userId ?? null,
      },
      include: {
        user: userId ? { select: { email: true, name: true } } : false,
      },
    });

    // Notify admin via email (fire-and-forget, never blocks the response)
    this.emailService.sendFeedbackNotification({
      type: dto.type,
      content: dto.content,
      pageUrl: dto.pageUrl,
      userName: feedback.user?.name ?? null,
      userEmail: feedback.user?.email ?? null,
    }).catch(() => {/* ignore email errors */});

    return { success: true };
  }

  // ─── Admin ────────────────────────────────────────────────────────────────

  async getAll(params: { status?: string; type?: string; page?: number; limit?: number }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const where: Record<string, string> = {};
    if (params.status) where.status = params.status;
    if (params.type) where.type = params.type;

    const [items, total] = await Promise.all([
      this.prisma.feedback.findMany({
        where,
        include: { user: { select: { id: true, email: true, name: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.feedback.count({ where }),
    ]);

    return { items, total, page, totalPages: Math.ceil(total / limit) };
  }

  async updateStatus(id: string, status: 'new' | 'reviewed' | 'resolved') {
    await this.prisma.feedback.update({ where: { id }, data: { status } });
    return { success: true };
  }
}
