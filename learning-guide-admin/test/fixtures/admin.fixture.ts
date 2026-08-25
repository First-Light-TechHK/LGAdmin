import { Admin } from '../../src/admin/entities/admin.entity';
import { JwtPayload } from '../../src/auth/interfaces/jwt-payload.interface';

export const adminFixture: Admin = {
  id: 1,
  username: 'admin',
  password: '202cb962ac59075b964b07152d234b70',
  nickname: 'Administrator',
  age: 20,
  createTime: new Date('2026-01-01T00:00:00.000Z'),
  updateTime: new Date('2026-01-01T00:00:00.000Z'),
};

export const jwtPayloadFixture: JwtPayload = {
  sub: adminFixture.id,
  username: adminFixture.username!,
};
