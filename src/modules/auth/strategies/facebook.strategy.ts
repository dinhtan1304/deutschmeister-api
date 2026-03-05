import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: config.get<string>('FACEBOOK_APP_ID'),
      clientSecret: config.get<string>('FACEBOOK_APP_SECRET'),
      callbackURL: config.get<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'emails', 'name', 'photos'],
      scope: ['email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (err: any, user?: any) => void,
  ) {
    const email = (profile.emails?.[0] as any)?.value;
    const name = profile.displayName || `${profile.name?.givenName ?? ''} ${profile.name?.familyName ?? ''}`.trim();
    const avatar = profile.photos?.[0]?.value;

    const tokens = await this.authService.findOrCreateOAuthUser(
      'facebook',
      profile.id,
      email,
      name,
      avatar,
    );
    done(null, tokens);
  }
}
