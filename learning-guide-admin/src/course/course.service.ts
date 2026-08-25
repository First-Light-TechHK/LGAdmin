import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseListDto } from './dto/course-list.dto';
import { Course } from './entities/course.entity';
import { CourseListItemVo } from './vo/course-list.vo';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findPage(
    query: CourseListDto,
  ): Promise<{ data: CourseListItemVo[]; total: number }> {
    const { pageNum, pageSize } = query;
    const [courses, total] = await this.courseRepository.findAndCount({
      relations: { teacher: true, category: true, subject: true },
      order: { id: 'DESC' },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: courses.map((course) => ({
        id: course.id,
        teacherId: course.teacherId,
        teacherName: course.teacher?.username ?? null,
        categoryId: course.categoryId,
        categoryName: course.category?.name ?? null,
        subjectId: course.subjectId,
        subjectName: course.subject?.name ?? null,
        type: course.type,
        title: course.title,
        description: course.description,
        cover: course.cover,
        level: course.level,
        tags: course.tags,
        lessons: course.lessons,
        hours: course.hours,
        price: Number(course.price ?? 0),
        discount: Number(course.discount ?? 0),
        status: course.status,
        createTime: course.createTime,
        updateTime: course.updateTime,
      })),
      total,
    };
  }
}
