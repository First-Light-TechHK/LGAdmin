import { TeacherController } from '../../../src/teacher/teacher.controller';
import { TeacherService } from '../../../src/teacher/teacher.service';
import { teacherFixture } from '../../fixtures/teacher.fixture';

describe('TeacherController', () => {
  const teacherService = { findPage: jest.fn(), create: jest.fn() };
  const controller = new TeacherController(
    teacherService as unknown as TeacherService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns the teacher page in the API response structure', async () => {
    teacherService.findPage.mockResolvedValue([teacherFixture]);
    const query = { pageNum: 1, pageSize: 10 };

    await expect(controller.findPage(query)).resolves.toEqual({
      code: 0,
      data: [teacherFixture],
      msg: 'success',
    });
    expect(teacherService.findPage).toHaveBeenCalledWith(query);
  });

  it('creates a teacher and returns the API response structure', async () => {
    const input = {
      username: 'jack',
      password: '123',
      nickname: 'Jack',
      age: 28,
      status: 1,
    };
    const { password: _password, ...createdTeacher } = teacherFixture;
    teacherService.create.mockResolvedValue(createdTeacher);

    await expect(controller.create(input)).resolves.toEqual({
      code: 0,
      data: createdTeacher,
      msg: 'success',
    });
    expect(teacherService.create).toHaveBeenCalledWith(input);
  });
});
