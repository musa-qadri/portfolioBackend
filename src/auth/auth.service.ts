import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const adminUser = process.env.ADMIN_USERNAME || 'musa';
    const adminPass = process.env.ADMIN_PASSWORD || 'musaqazim123';

    if (email !== adminUser || password !== adminPass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 1, email: adminUser, role: 'admin' };
    const token = this.jwtService.sign(payload);
    return { access_token: token, user: { id: 1, email: adminUser, role: 'admin' } };
  }
}
