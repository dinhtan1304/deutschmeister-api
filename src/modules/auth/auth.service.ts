import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (exists) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        name: dto.name,
        emailVerifyToken: verifyToken,
        emailVerifyExpiry: verifyExpiry,
        settings: { create: {} },
      },
    });

    await this.emailService.sendVerificationEmail(user.email, user.name ?? '', verifyToken);

    return { message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.' };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { emailVerifyToken: token },
    });

    if (!user) throw new BadRequestException('Token xác nhận không hợp lệ');
    if (user.emailVerified) throw new BadRequestException('Email đã được xác nhận trước đó');
    if (!user.emailVerifyExpiry || user.emailVerifyExpiry < new Date()) {
      throw new BadRequestException('Token xác nhận đã hết hạn. Vui lòng đăng ký lại.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpiry: null,
      },
    });

    return { message: 'Email đã được xác nhận thành công! Bạn có thể đăng nhập ngay.' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException('This account uses social login. Please sign in with Google or Facebook.');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    if (!user.emailVerified) {
      throw new UnauthorizedException('EMAIL_NOT_VERIFIED');
    }

    return this.generateTokens(user.id, user.email, user.role);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    // Always return same message to prevent email enumeration
    if (!user || !user.passwordHash) {
      return { message: 'Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu.' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordResetToken: resetToken, passwordResetExpiry: resetExpiry },
    });

    await this.emailService.sendPasswordResetEmail(user.email, user.name ?? '', resetToken);

    return { message: 'Nếu email tồn tại, chúng tôi đã gửi link đặt lại mật khẩu.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: { passwordResetToken: dto.token },
    });

    if (!user) throw new BadRequestException('Token không hợp lệ hoặc đã được sử dụng');
    if (!user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
      throw new BadRequestException('Token đã hết hạn. Vui lòng yêu cầu lại.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    return { message: 'Mật khẩu đã được đặt lại thành công! Vui lòng đăng nhập.' };
  }

  async findOrCreateOAuthUser(
    provider: string,
    providerUid: string,
    email: string,
    name: string,
    avatar?: string,
  ) {
    // 1. Check existing OAuth link
    const existing = await this.prisma.oAuthAccount.findUnique({
      where: { provider_providerUid: { provider, providerUid } },
      include: { user: true },
    });

    if (existing) {
      return this.generateTokens(existing.user.id, existing.user.email, existing.user.role);
    }

    // 2. Check existing user by email (link accounts)
    let user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // 3. Create new user (OAuth users are auto-verified)
      user = await this.prisma.user.create({
        data: {
          email: email.toLowerCase(),
          name,
          avatar,
          emailVerified: true,
          settings: { create: {} },
        },
      });
    }

    // 4. Create OAuth link
    await this.prisma.oAuthAccount.create({
      data: { provider, providerUid, userId: user.id },
    });

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
