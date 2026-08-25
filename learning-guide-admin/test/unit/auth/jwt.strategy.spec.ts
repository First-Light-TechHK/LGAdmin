import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../../src/auth/jwt.strategy';
import { jwtPayloadFixture } from '../../fixtures/admin.fixture';

describe('JwtStrategy', () => {
  it('returns the validated payload', () => {
    const configService = {
      getOrThrow: jest.fn().mockReturnValue('test-jwt-secret'),
    };
    const strategy = new JwtStrategy(configService as unknown as ConfigService);

    expect(strategy.validate(jwtPayloadFixture)).toEqual(jwtPayloadFixture);
    expect(configService.getOrThrow).toHaveBeenCalledWith('JWT_SECRET');
  });
});
