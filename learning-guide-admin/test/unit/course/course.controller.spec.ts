import { CourseController } from '../../../src/course/course.controller';
import { CourseService } from '../../../src/course/course.service';

describe('CourseController', () => {
  const courseService = { findPage: jest.fn() };
  const controller = new CourseController(
    courseService as unknown as CourseService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns the course page and total in the API response structure', async () => {
    const course = { id: 23, title: 'Biology course' };
    courseService.findPage.mockResolvedValue({ data: [course], total: 10 });
    const query = { pageNum: 1, pageSize: 10 };

    await expect(controller.findPage(query)).resolves.toEqual({
      code: 0,
      data: [course],
      msg: 'success',
      total: 10,
    });
    expect(courseService.findPage).toHaveBeenCalledWith(query);
  });
});
