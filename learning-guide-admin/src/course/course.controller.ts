import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseListDto } from './dto/course-list.dto';
import { CourseListVo } from './vo/course-list.vo';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('list')
  async findPage(@Body() query: CourseListDto): Promise<CourseListVo> {
    const result = await this.courseService.findPage(query);
    return {
      code: 0,
      data: result.data,
      msg: 'success',
      total: result.total,
    };
  }
}
