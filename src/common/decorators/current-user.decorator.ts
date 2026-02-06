import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    // Return specific field
    if (data) {
      return user[data];
    }

    // Return full user object
    return user;
  },
);

// Alternative: GetUser decorator (alias)
export const GetUser = CurrentUser;