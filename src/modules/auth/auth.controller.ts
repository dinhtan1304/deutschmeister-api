import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

// Cookie configuration
const REFRESH_TOKEN_COOKIE = 'refreshToken';
const COOKIE_OPTIONS = {
  httpOnly: true, // Prevents XSS attacks - JavaScript cannot access this cookie
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'lax' as const, // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  path: '/', // Available for all routes
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(dto);

    // Set refresh token as httpOnly cookie
    res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, COOKIE_OPTIONS);

    // Return only accessToken and user (no refreshToken in body)
    return res.json({
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto);

    // Set refresh token as httpOnly cookie
    res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, COOKIE_OPTIONS);

    // Return only accessToken and user (no refreshToken in body)
    return res.json({
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token' })
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dto: RefreshTokenDto,
  ) {
    // Try to get refresh token from cookie first, then from body (backward compatibility)
    const refreshToken =
      req.cookies?.[REFRESH_TOKEN_COOKIE] || dto?.refreshToken;

    if (!refreshToken) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Refresh token not found',
      });
    }

    const result = await this.authService.refreshToken(refreshToken);

    // Set new refresh token as httpOnly cookie
    res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, COOKIE_OPTIONS);

    // Return only accessToken and user
    return res.json({
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  async logout(@CurrentUser('id') userId: string, @Res() res: Response) {
    await this.authService.logout(userId);

    // Clear the refresh token cookie
    res.clearCookie(REFRESH_TOKEN_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.json({ message: 'Logged out successfully' });
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  getMe(@CurrentUser('id') userId: string) {
    return this.authService.getMe(userId);
  }

  // ─── Google OAuth ────────────────────────────────────────────────────────────

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  googleLogin() {
    // Passport redirects to Google — no body needed
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  googleCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } = req.user as any;
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS);
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }

  // ─── Facebook OAuth ──────────────────────────────────────────────────────────

  @Public()
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Initiate Facebook OAuth login' })
  facebookLogin() {
    // Passport redirects to Facebook — no body needed
  }

  @Public()
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Facebook OAuth callback' })
  facebookCallback(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } = req.user as any;
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS);
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }
}