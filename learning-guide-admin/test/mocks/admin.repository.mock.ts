export const createAdminRepositoryMock = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  createQueryBuilder: jest.fn(),
});
