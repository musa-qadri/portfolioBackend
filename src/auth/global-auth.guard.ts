import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GlobalAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // Allow all GET requests
    if (request.method === 'GET') {
      return true;
    }
    // Allow auth routes
    if (request.url.startsWith('/auth/')) {
      return true;
    }
    return super.canActivate(context);
  }
}
