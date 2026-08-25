import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../src/user/entities/user.entity';
import { UserService } from '../../../src/user/user.service';
import { userFixture } from '../../fixtures/user.fixture';
import { createTestingModule } from '../../helpers/create-testing-module';
import { createUserRepositoryMock } from '../../mocks/user.repository.mock';

describe('UserService', () => {
  const repository = createUserRepositoryMock();
  let service: UserService;

  beforeAll(async () => {
    const module = await createTestingModule([], [
      UserService,
      { provide: getRepositoryToken(User), useValue: repository },
    ]);
    service = module.get(UserService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('queries the requested page ordered by id', async () => {
    repository.find.mockResolvedValue([userFixture]);

    await expect(service.findPage({ pageNum: 2, pageSize: 10 })).resolves.toEqual([
      userFixture,
    ]);
    expect(repository.find).toHaveBeenCalledWith({
      order: { id: 'ASC' },
      skip: 10,
      take: 10,
    });
  });
});
