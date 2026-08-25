import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../teacher/entities/teacher.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Category } from './entities/category.entity';
import { Course } from './entities/course.entity';
import { Subject } from './entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Teacher, Category, Subject])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
