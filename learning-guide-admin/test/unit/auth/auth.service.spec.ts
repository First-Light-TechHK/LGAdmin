import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../../../src/admin/admin.service';
import { AuthService } from '../../../src/auth/auth.service';
import { adminFixture, jwtPayloadFixture } from '../../fixtures/admin.fixture';
import { createJwtServiceMock } from '../../mocks/jwt.service.mock';

describe('AuthService', () => {
  const adminService = { findByUsernameWithPassword: jest.fn() };
  const jwtService = createJwtServiceMock();
  const service = new AuthService(
    adminService as unknown as AdminService,
    jwtService as unknown as JwtService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns admin information and a token for valid credentials', async () => {
    adminService.findByUsernameWithPassword.mockResolvedValue(adminFixture);
    jwtService.signAsync.mockResolvedValue('signed-token');

    await expect(
      service.login({ username: 'admin', password: '123' }),
    ).resolves.toEqual({
      id: adminFixture.id,
      username: adminFixture.username,
      nickname: adminFixture.nickname,
      token: 'signed-token',
    });
    expect(jwtService.signAsync).toHaveBeenCalledWith(jwtPayloadFixture);
  });

  it('rejects an unknown username', async () => {
    adminService.findByUsernameWithPassword.mockResolvedValue(null);
    await expect(
      service.login({ username: 'unknown', password: '123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('rejects an incorrect password', async () => {
    adminService.findByUsernameWithPassword.mockResolvedValue(adminFixture);
    await expect(
      service.login({ username: 'admin', password: 'incorrect' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('rejects an account without a password', async () => {
    adminService.findByUsernameWithPassword.mockResolvedValue({
      ...adminFixture,
      password: null,
    });
    await expect(
      service.login({ username: 'admin', password: '123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
