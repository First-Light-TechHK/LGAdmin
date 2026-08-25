import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'node:crypto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherListQueryDto } from './dto/teacher-list-query.dto';
import { Teacher } from './entities/teacher.entity';
import { CreatedTeacherVo } from './vo/create-teacher.vo';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  findPage(query: TeacherListQueryDto): Promise<Teacher[]> {
    const { pageNum, pageSize } = query;
    return this.teacherRepository.find({
      order: { id: 'ASC' },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
  }

  async create(createTeacherDto: CreateTeacherDto): Promise<CreatedTeacherVo> {
    const teacher = this.teacherRepository.create({
      ...createTeacherDto,
      nickname: createTeacherDto.nickname ?? null,
      password: createHash('md5')
        .update(createTeacherDto.password)
        .digest('hex'),
    });
    const savedTeacher = await this.teacherRepository.save(teacher);
    const { password: _password, ...result } = savedTeacher;
    return result;
  }
}
