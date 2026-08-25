import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { ApiResponse } from '../common/interfaces/api-response.interface';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

type AuthenticatedRequest = Request & { user: JwtPayload };

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('list')
  async findAll(): Promise<ApiResponse<Admin[]>> {
    const admins = await this.adminService.findAll();
    return { code: 0, data: admins, msg: 'success' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('userInfo')
  async getUserInfo(
    @Req() request: AuthenticatedRequest,
  ): Promise<ApiResponse<Admin>> {
    const admin = await this.adminService.findById(request.user.sub);
    if (!admin) {
      throw new UnauthorizedException('当前管理员不存在');
    }
    return { code: 0, data: admin, msg: 'success' };
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Admin>> {
    const admin = await this.adminService.findById(id);
    if (!admin) {
      throw new NotFoundException('管理员不存在');
    }
    return { code: 0, data: admin, msg: 'success' };
  }
}
