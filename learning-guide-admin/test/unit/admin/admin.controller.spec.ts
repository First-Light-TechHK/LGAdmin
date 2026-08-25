import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AdminController } from '../../../src/admin/admin.controller';
import { AdminService } from '../../../src/admin/admin.service';
import { adminFixture, jwtPayloadFixture } from '../../fixtures/admin.fixture';

describe('AdminController', () => {
  const adminService = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };
  const controller = new AdminController(
    adminService as unknown as AdminService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns all admins', async () => {
    adminService.findAll.mockResolvedValue([adminFixture]);
    await expect(controller.findAll()).resolves.toEqual({
      code: 0,
      data: [adminFixture],
      msg: 'success',
    });
  });

  it('returns an admin by id', async () => {
    adminService.findById.mockResolvedValue(adminFixture);
    await expect(controller.findById(1)).resolves.toEqual({
      code: 0,
      data: adminFixture,
      msg: 'success',
    });
    expect(adminService.findById).toHaveBeenCalledWith(1);
  });

  it('throws when an admin id does not exist', async () => {
    adminService.findById.mockResolvedValue(null);
    await expect(controller.findById(99)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('returns the authenticated admin information', async () => {
    adminService.findById.mockResolvedValue(adminFixture);
    const request = { user: jwtPayloadFixture };
    await expect(controller.getUserInfo(request as never)).resolves.toEqual({
      code: 0,
      data: adminFixture,
      msg: 'success',
    });
  });

  it('rejects userInfo when the authenticated admin no longer exists', async () => {
    adminService.findById.mockResolvedValue(null);
    const request = { user: jwtPayloadFixture };
    await expect(
      controller.getUserInfo(request as never),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
