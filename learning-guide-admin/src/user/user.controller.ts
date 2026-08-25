import { Controller, Get, Query } from '@nestjs/common';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { UserService } from './user.service';
import { UserListVo } from './vo/user-list.vo';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async findPage(@Query() query: UserListQueryDto): Promise<UserListVo> {
    const users = await this.userService.findPage(query);
    return {
      code: 0,
      data: users,
      msg: 'success',
    };
  }
}
