import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AdminLoginDto } from '../../../src/auth/dto/admin-login.dto';

describe('AdminLoginDto', () => {
  it('accepts valid login input', async () => {
    const dto = plainToInstance(AdminLoginDto, {
      username: 'admin',
      password: '123',
    });
    await expect(validate(dto)).resolves.toHaveLength(0);
  });

  it.each([
    { username: '', password: '123' },
    { username: 'admin', password: '' },
    { username: 123, password: '123' },
    { username: 'a'.repeat(101), password: '123' },
  ])('rejects invalid login input: %o', async (input) => {
    const errors = await validate(plainToInstance(AdminLoginDto, input));
    expect(errors.length).toBeGreaterThan(0);
  });
});
