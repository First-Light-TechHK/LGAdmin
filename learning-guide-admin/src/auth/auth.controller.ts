import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminLoginVo } from './vo/admin-login.vo';
import type { ApiResponse } from '../common/interfaces/api-response.interface';

type AuthenticatedRequest = Request & { user: JwtPayload };

@Controller('admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AdminLoginDto): Promise<AdminLoginVo> {
    const admin = await this.authService.login(loginDto);
    return {
      code: 0,
      data: admin,
      msg: 'success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() request: AuthenticatedRequest): ApiResponse<JwtPayload> {
    return { code: 0, data: request.user, msg: 'success' };
  }
}
