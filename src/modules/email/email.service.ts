import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: config.get('SMTP_HOST'),
      port: Number(config.get('SMTP_PORT') || 587),
      secure: config.get('SMTP_SECURE') === 'true',
      auth: {
        user: config.get('SMTP_USER'),
        pass: config.get('SMTP_PASS'),
      },
    });
  }

  async sendVerificationEmail(email: string, name: string, token: string) {
    const frontendUrl = this.config.get('FRONTEND_URL');
    const verifyUrl = `${frontendUrl}/auth/verify-email/confirm?token=${token}`;
    const from = this.config.get('SMTP_FROM') || '"DeutschMeister" <noreply@deutschmeister.app>';

    try {
    await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Xác nhận email đăng ký – DeutschMeister',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#22C55E,#14B8A6);padding:28px 32px;text-align:center;">
            <div style="font-size:32px;margin-bottom:6px;">🇩🇪</div>
            <h1 style="margin:0;font-size:22px;color:#fff;font-weight:800;">DeutschMeister</h1>
          </div>
          <div style="padding:32px;">
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Xác nhận địa chỉ email</h2>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7;margin:0 0 24px;">
              Xin chào <strong style="color:#4ADE80;">${name || email}</strong>,<br/>
              Cảm ơn bạn đã đăng ký! Vui lòng nhấn nút bên dưới để xác nhận email và kích hoạt tài khoản.
            </p>
            <div style="text-align:center;margin:28px 0;">
              <a href="${verifyUrl}"
                 style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#22C55E,#14B8A6);color:#fff;font-weight:700;font-size:15px;border-radius:12px;text-decoration:none;">
                Xác nhận email
              </a>
            </div>
            <p style="color:rgba(255,255,255,0.4);font-size:12px;line-height:1.6;margin:0;">
              Link có hiệu lực trong <strong>24 giờ</strong>. Nếu bạn không đăng ký tài khoản này, hãy bỏ qua email này.
            </p>
          </div>
        </div>
      `,
    });
    this.logger.log(`Verification email sent to ${email}`);
    } catch (err) {
      this.logger.error(`Failed to send verification email to ${email}: ${err?.message}`);
      // Do NOT rethrow — user is already created in DB; they can request a resend later
    }
  }

  async sendPasswordResetEmail(email: string, name: string, token: string) {
    const frontendUrl = this.config.get('FRONTEND_URL');
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;
    const from = this.config.get('SMTP_FROM') || '"DeutschMeister" <noreply@deutschmeister.app>';

    try {
    await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Đặt lại mật khẩu – DeutschMeister',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#6366F1,#8B5CF6);padding:28px 32px;text-align:center;">
            <div style="font-size:32px;margin-bottom:6px;">🔑</div>
            <h1 style="margin:0;font-size:22px;color:#fff;font-weight:800;">DeutschMeister</h1>
          </div>
          <div style="padding:32px;">
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Đặt lại mật khẩu</h2>
            <p style="color:rgba(255,255,255,0.7);line-height:1.7;margin:0 0 24px;">
              Xin chào <strong style="color:#818CF8;">${name || email}</strong>,<br/>
              Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nhấn nút bên dưới để tiếp tục.
            </p>
            <div style="text-align:center;margin:28px 0;">
              <a href="${resetUrl}"
                 style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;font-weight:700;font-size:15px;border-radius:12px;text-decoration:none;">
                Đặt lại mật khẩu
              </a>
            </div>
            <p style="color:rgba(255,255,255,0.4);font-size:12px;line-height:1.6;margin:0;">
              Link có hiệu lực trong <strong>1 giờ</strong>. Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này — tài khoản của bạn vẫn an toàn.
            </p>
          </div>
        </div>
      `,
    });

    this.logger.log(`Password reset email sent to ${email}`);
    } catch (err) {
      this.logger.error(`Failed to send password reset email to ${email}: ${err?.message}`);
      // Do NOT rethrow — token is already saved; user can retry forgot-password flow
    }
  }

  async sendFeedbackNotification(data: {
    type: string;
    content: string;
    pageUrl?: string;
    userName: string | null;
    userEmail: string | null;
  }) {
    const adminEmail = this.config.get('ADMIN_EMAIL') || this.config.get('SMTP_USER');
    if (!adminEmail) return;

    const from = this.config.get('SMTP_FROM') || '"DeutschMeister" <noreply@deutschmeister.app>';
    const typeLabel: Record<string, string> = {
      bug: '🐛 Báo cáo Bug',
      suggestion: '💡 Góp ý / Đề xuất',
      other: '💬 Khác',
    };
    const label = typeLabel[data.type] ?? data.type;

    try {
      await this.transporter.sendMail({
        from,
        to: adminEmail,
        subject: `[DeutschMeister Feedback] ${label}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0f1e;color:#e2e8f0;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#6366F1,#8B5CF6);padding:20px 28px;">
              <h1 style="margin:0;font-size:18px;color:#fff;font-weight:800;">📬 Feedback mới</h1>
            </div>
            <div style="padding:24px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:6px 0;color:rgba(255,255,255,.5);font-size:12px;width:100px;">Loại</td><td style="padding:6px 0;color:#fff;font-weight:700;">${label}</td></tr>
                <tr><td style="padding:6px 0;color:rgba(255,255,255,.5);font-size:12px;">Người dùng</td><td style="padding:6px 0;color:#fff;">${data.userEmail ? `${data.userName ?? ''} &lt;${data.userEmail}&gt;` : 'Ẩn danh'}</td></tr>
                ${data.pageUrl ? `<tr><td style="padding:6px 0;color:rgba(255,255,255,.5);font-size:12px;">Trang</td><td style="padding:6px 0;color:#818CF8;">${data.pageUrl}</td></tr>` : ''}
              </table>
              <div style="margin-top:16px;padding:16px;background:rgba(255,255,255,.05);border-radius:10px;border-left:3px solid #6366F1;">
                <p style="margin:0;color:#e2e8f0;line-height:1.7;white-space:pre-wrap;">${data.content}</p>
              </div>
            </div>
          </div>
        `,
      });
      this.logger.log(`Feedback notification sent to admin`);
    } catch (err) {
      this.logger.error(`Failed to send feedback notification: ${err?.message}`);
    }
  }
}
