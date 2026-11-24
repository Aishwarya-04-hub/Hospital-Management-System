import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Protects write operations (POST/PATCH/DELETE) with an x-api-key header. GET stays public.
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (req.method === 'GET') return true;
    if (req.headers['x-api-key'] !== this.config.get('API_KEY')) {
      throw new UnauthorizedException('Invalid or missing x-api-key header');
    }
    return true;
  }
}