import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseService } from '../../../src/course/course.service';
import { Course } from '../../../src/course/entities/course.entity';
import { courseFixture } from '../../fixtures/course.fixture';
import { createTestingModule } from '../../helpers/create-testing-module';
import { createCourseRepositoryMock } from '../../mocks/course.repository.mock';

describe('CourseService', () => {
  const repository = createCourseRepositoryMock();
  let service: CourseService;

  beforeAll(async () => {
    const module = await createTestingModule([], [
      CourseService,
      { provide: getRepositoryToken(Course), useValue: repository },
    ]);
    service = module.get(CourseService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('queries relations and maps the requested course page', async () => {
    repository.findAndCount.mockResolvedValue([[courseFixture], 10]);

    const result = await service.findPage({ pageNum: 2, pageSize: 10 });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      relations: { teacher: true, category: true, subject: true },
      order: { id: 'DESC' },
      skip: 10,
      take: 10,
    });
    expect(result).toEqual({
      data: [
        {
          id: 23,
          teacherId: 1,
          teacherName: 'jack',
          categoryId: 1,
          categoryName: '古诗词',
          subjectId: null,
          subjectName: null,
          type: 1,
          title: 'Biology course',
          description: 'Biology course 测试',
          cover: '',
          level: 1,
          tags: '',
          lessons: 0,
          hours: 0,
          price: 0,
          discount: 0,
          status: 1,
          createTime: courseFixture.createTime,
          updateTime: courseFixture.updateTime,
        },
      ],
      total: 10,
    });
  });
});
