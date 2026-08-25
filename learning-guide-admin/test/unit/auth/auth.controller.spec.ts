import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { adminFixture, jwtPayloadFixture } from '../../fixtures/admin.fixture';

describe('AuthController', () => {
  const authService = { login: jest.fn() };
  const controller = new AuthController(authService as unknown as AuthService);

  beforeEach(() => jest.clearAllMocks());

  it('delegates login to AuthService', async () => {
    const loginDto = { username: 'admin', password: '123' };
    const result = {
      id: adminFixture.id,
      username: adminFixture.username!,
      nickname: adminFixture.nickname,
      token: 'signed-token',
    };
    authService.login.mockResolvedValue(result);

    await expect(controller.login(loginDto)).resolves.toEqual({
      code: 0,
      data: result,
      msg: 'success',
    });
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });

  it('returns the authenticated JWT payload from profile', () => {
    expect(controller.profile({ user: jwtPayloadFixture } as never)).toEqual({
      code: 0,
      data: jwtPayloadFixture,
      msg: 'success',
    });
  });
});
