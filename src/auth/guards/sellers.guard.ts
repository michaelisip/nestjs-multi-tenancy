import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/enums';

@Injectable()
export class SellersGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { sub, username, role } = ctx.getContext().req.user;

    if (role === UserRole.Seller) {
      return ctx.getContext().req;
    }

    throw new UnauthorizedException();
  }
}
