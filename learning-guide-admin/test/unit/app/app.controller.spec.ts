import { AppController } from '../../../src/app.controller';
import { AppService } from '../../../src/app.service';

describe('AppController', () => {
  it('returns the value provided by AppService', () => {
    const appService = { getHello: jest.fn().mockReturnValue('Hello World!#') };
    const controller = new AppController(appService as AppService);

    expect(controller.getHello()).toEqual({
      code: 0,
      data: 'Hello World!#',
      msg: 'success',
    });
    expect(appService.getHello).toHaveBeenCalledTimes(1);
  });
});
