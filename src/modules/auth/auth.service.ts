import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (exists) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        name: dto.name,
        settings: { create: {} },
      },
    });

    return this.generateTokens(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user.id, user.email, user.role);
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const stored = await this.prisma.refreshToken.findUnique({
        where: { token },
        include: { user: true },
      });

      if (!stored || stored.expiresAt < new Date()) {
        throw new UnauthorizedException();
      }

      await this.prisma.refreshToken.delete({ where: { id: stored.id } });
      return this.generateTokens(stored.user.id, stored.user.email, stored.user.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
  }

  async getMe(userId: string) {
    const [user, sub] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, avatar: true, role: true, createdAt: true, settings: true },
      }),
      this.prisma.userSubscription.findUnique({ where: { userId } }),
    ]);

    const isPremium =
      sub?.plan === 'premium' &&
      sub.status === 'active' &&
      (!sub.expiresAt || sub.expiresAt > new Date());

    return {
      ...user,
      subscription: {
        plan: isPremium ? 'premium' : 'free',
        status: sub?.status ?? 'active',
        expiresAt: sub?.expiresAt ?? null,
      },
    };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // All three DB operations are independent — run in parallel instead of
    // sequentially (previously 3 serial round-trips per login/register).
    //
    // deleteMany: prune expired tokens so users who never explicitly logout
    //   don't accumulate one row per login indefinitely.
    // create:     persist the new refresh token.
    // findUnique: fetch the user shape required by the response DTO.
    const [, , user] = await Promise.all([
      this.prisma.refreshToken.deleteMany({
        where: { userId, expiresAt: { lt: new Date() } },
      }),
      this.prisma.refreshToken.create({
        data: { token: refreshToken, userId, expiresAt },
      }),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, role: true },
      }),
    ]);

    return { accessToken, refreshToken, user };
  }
}