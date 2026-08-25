import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from '../../../src/teacher/entities/teacher.entity';
import { TeacherService } from '../../../src/teacher/teacher.service';
import { teacherFixture } from '../../fixtures/teacher.fixture';
import { createTestingModule } from '../../helpers/create-testing-module';
import { createTeacherRepositoryMock } from '../../mocks/teacher.repository.mock';

describe('TeacherService', () => {
  const repository = createTeacherRepositoryMock();
  let service: TeacherService;

  beforeAll(async () => {
    const module = await createTestingModule([], [
      TeacherService,
      { provide: getRepositoryToken(Teacher), useValue: repository },
    ]);
    service = module.get(TeacherService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('queries the requested page ordered by id', async () => {
    repository.find.mockResolvedValue([teacherFixture]);

    await expect(service.findPage({ pageNum: 2, pageSize: 10 })).resolves.toEqual([
      teacherFixture,
    ]);
    expect(repository.find).toHaveBeenCalledWith({
      order: { id: 'ASC' },
      skip: 10,
      take: 10,
    });
  });

  it('hashes the password, saves the teacher and omits the password', async () => {
    const input = {
      username: 'jack',
      password: '123',
      nickname: 'Jack',
      age: 28,
      status: 1,
    };
    const entity = {
      ...teacherFixture,
      ...input,
      password: '202cb962ac59075b964b07152d234b70',
    };
    repository.create.mockReturnValue(entity);
    repository.save.mockResolvedValue(entity);

    const result = await service.create(input);

    expect(repository.create).toHaveBeenCalledWith({
      ...input,
      password: '202cb962ac59075b964b07152d234b70',
    });
    expect(repository.save).toHaveBeenCalledWith(entity);
    expect(result).toEqual({
      id: entity.id,
      username: entity.username,
      nickname: entity.nickname,
      age: entity.age,
      status: entity.status,
      createTime: entity.createTime,
      updateTime: entity.updateTime,
    });
    expect(result).not.toHaveProperty('password');
  });
});
