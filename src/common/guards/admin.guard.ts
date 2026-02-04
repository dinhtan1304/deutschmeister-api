import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Không có quyền truy cập');
    }

    // Check if user has admin role
    // Điều chỉnh theo cấu trúc user của bạn
    const isAdmin = user.role === 'admin' || user.isAdmin === true;

    if (!isAdmin) {
      throw new ForbiddenException('Chỉ admin mới có quyền thực hiện thao tác này');
    }

    return true;
  }
}