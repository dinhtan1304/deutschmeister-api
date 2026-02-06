import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Không có quyền truy cập');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('Chỉ admin mới có quyền thực hiện thao tác này');
    }

    return true;
  }
}