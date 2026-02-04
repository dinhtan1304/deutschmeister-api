import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    // If requesting specific field
    if (data) {
      // Handle 'id' specially - JWT often uses 'sub' for user ID
      if (data === 'id') {
        return user.id || user.sub || user.userId || user._id;
      }
      return user[data];
    }

    // Return full user object with normalized id
    return {
      ...user,
      id: user.id || user.sub || user.userId || user._id,
    };
  },
);

// Alternative: GetUser decorator (alias)
export const GetUser = CurrentUser;