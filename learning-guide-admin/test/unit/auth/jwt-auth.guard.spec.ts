import { JwtAuthGuard } from '../../../src/auth/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('creates a Passport JWT guard', () => {
    const guard = new JwtAuthGuard();

    expect(guard).toBeInstanceOf(JwtAuthGuard);
    expect(typeof guard.canActivate).toBe('function');
  });
});
