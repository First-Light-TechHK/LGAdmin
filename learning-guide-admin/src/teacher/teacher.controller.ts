import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherListQueryDto } from './dto/teacher-list-query.dto';
import { TeacherService } from './teacher.service';
import { TeacherListVo } from './vo/teacher-list.vo';
import { CreateTeacherVo } from './vo/create-teacher.vo';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('list')
  async findPage(@Query() query: TeacherListQueryDto): Promise<TeacherListVo> {
    const teachers = await this.teacherService.findPage(query);
    return {
      code: 0,
      data: teachers,
      msg: 'success',
    };
  }


  @Post('add')
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<CreateTeacherVo> {
    const teacher = await this.teacherService.create(createTeacherDto);
    return {
      code: 0,
      data: teacher,
      msg: 'success',
    };
  }
}
