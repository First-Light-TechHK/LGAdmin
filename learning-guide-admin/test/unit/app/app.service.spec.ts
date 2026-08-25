import { AppService } from '../../../src/app.service';

describe('AppService', () => {
  it('returns the application greeting', () => {
    expect(new AppService().getHello()).toBe('Hello World!#');
  });
});
