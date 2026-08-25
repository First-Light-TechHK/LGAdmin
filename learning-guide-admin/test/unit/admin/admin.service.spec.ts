import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminService } from '../../../src/admin/admin.service';
import { Admin } from '../../../src/admin/entities/admin.entity';
import { adminFixture } from '../../fixtures/admin.fixture';
import { createTestingModule } from '../../helpers/create-testing-module';
import { createAdminRepositoryMock } from '../../mocks/admin.repository.mock';

describe('AdminService', () => {
  const repository = createAdminRepositoryMock();
  let service: AdminService;

  beforeAll(async () => {
    const module = await createTestingModule([], [
      AdminService,
      { provide: getRepositoryToken(Admin), useValue: repository },
    ]);
    service = module.get(AdminService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('finds all admins ordered by id', async () => {
    repository.find.mockResolvedValue([adminFixture]);
    await expect(service.findAll()).resolves.toEqual([adminFixture]);
    expect(repository.find).toHaveBeenCalledWith({ order: { id: 'ASC' } });
  });

  it('finds an admin by id', async () => {
    repository.findOneBy.mockResolvedValue(adminFixture);
    await expect(service.findById(1)).resolves.toEqual(adminFixture);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('selects the password when looking up an admin for login', async () => {
    const queryBuilder = {
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValue(adminFixture),
    };
    repository.createQueryBuilder.mockReturnValue(queryBuilder);

    await expect(service.findByUsernameWithPassword('admin')).resolves.toEqual(adminFixture);
    expect(queryBuilder.addSelect).toHaveBeenCalledWith('admin.password');
    expect(queryBuilder.where).toHaveBeenCalledWith('admin.username = :username', {
      username: 'admin',
    });
  });
});
