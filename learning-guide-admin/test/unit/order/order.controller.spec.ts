import { OrderController } from '../../../src/order/order.controller';
import { OrderService } from '../../../src/order/order.service';

describe('OrderController', () => {
  const orderService = { findPage: jest.fn() };
  const controller = new OrderController(
    orderService as unknown as OrderService,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns the order page and total in the API response structure', async () => {
    const order = { id: 1, orderNo: '202604282038321003256' };
    orderService.findPage.mockResolvedValue({ data: [order], total: 1 });
    const query = { pageNum: 1, pageSize: 10 };

    await expect(controller.findPage(query)).resolves.toEqual({
      code: 0,
      data: [order],
      msg: 'success',
      total: 1,
    });
    expect(orderService.findPage).toHaveBeenCalledWith(query);
  });
});
