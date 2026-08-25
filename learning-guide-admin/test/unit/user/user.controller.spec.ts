import { UserController } from '../../../src/user/user.controller';
import { UserService } from '../../../src/user/user.service';
import { userFixture } from '../../fixtures/user.fixture';

describe('UserController', () => {
  const userService = { findPage: jest.fn() };
  const controller = new UserController(
    userService as unknown as UserService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns the user page in the API response structure', async () => {
    userService.findPage.mockResolvedValue([userFixture]);
    const query = { pageNum: 1, pageSize: 10 };

    await expect(controller.findPage(query)).resolves.toEqual({
      code: 0,
      data: [userFixture],
      msg: 'success',
    });
    expect(userService.findPage).toHaveBeenCalledWith(query);
  });
});
