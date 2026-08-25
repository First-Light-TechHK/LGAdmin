import { createHash, timingSafeEqual } from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AdminLoginDataVo } from './vo/admin-login.vo';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: AdminLoginDto): Promise<AdminLoginDataVo> {
    const admin = await this.adminService.findByUsernameWithPassword(
      loginDto.username,
    );

    if (!admin || !admin.username || !admin.password) {
      throw new UnauthorizedException('账号不存在');
    }

    const inputHash = createHash('md5').update(loginDto.password).digest('hex');
    if (!this.isSameHash(inputHash, admin.password)) {
      throw new UnauthorizedException('密码错误');
    }

    const payload: JwtPayload = { sub: admin.id, username: admin.username };
    return {
      id: admin.id,
      username: admin.username,
      nickname: admin.nickname,
      token: await this.jwtService.signAsync(payload),
    };
  }

  private isSameHash(actual: string, expected: string): boolean {
    const actualBuffer = Buffer.from(actual.toLowerCase());
    const expectedBuffer = Buffer.from(expected.toLowerCase());
    return (
      actualBuffer.length === expectedBuffer.length &&
      timingSafeEqual(actualBuffer, expectedBuffer)
    );
  }
}
