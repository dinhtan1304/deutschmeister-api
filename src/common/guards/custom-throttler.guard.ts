import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Custom throttler that tracks by userId when authenticated,
 * falling back to IP address for public endpoints.
 *
 * Default ThrottlerGuard only tracks by IP — with shared IPs (CGNAT,
 * corporate proxies) multiple users count against the same bucket, and
 * a single attacker can bypass limits by rotating IPs.
 */
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.user?.id ?? req.ip;
  }
}
