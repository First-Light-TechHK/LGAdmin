import { Course } from '../../src/course/entities/course.entity';
import { teacherFixture } from './teacher.fixture';

export const courseFixture: Course = {
  id: 23,
  teacherId: 1,
  categoryId: 1,
  subjectId: null,
  type: 1,
  title: 'Biology course',
  subTitle: null,
  description: 'Biology course 测试',
  cover: '',
  level: 1,
  tags: '',
  lessons: 0,
  hours: 0,
  price: '0.00',
  discount: '0.00',
  status: 1,
  createTime: new Date('2026-08-08T10:26:26'),
  updateTime: new Date('2026-08-08T10:26:26'),
  teacher: teacherFixture,
  category: { id: 1, name: '古诗词' },
  subject: null,
};
