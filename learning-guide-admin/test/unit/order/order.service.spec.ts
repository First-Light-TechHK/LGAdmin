import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../../../src/order/entities/order.entity';
import { OrderService } from '../../../src/order/order.service';
import { orderFixture } from '../../fixtures/order.fixture';
import { createTestingModule } from '../../helpers/create-testing-module';
import { createOrderRepositoryMock } from '../../mocks/order.repository.mock';

describe('OrderService', () => {
  const repository = createOrderRepositoryMock();
  let service: OrderService;

  beforeAll(async () => {
    const module = await createTestingModule([], [
      OrderService,
      { provide: getRepositoryToken(Order), useValue: repository },
    ]);
    service = module.get(OrderService);
  });

  beforeEach(() => jest.clearAllMocks());

  it('queries relations and maps the requested order page', async () => {
    repository.findAndCount.mockResolvedValue([[orderFixture], 1]);

    const result = await service.findPage({ pageNum: 2, pageSize: 10 });

    expect(repository.findAndCount).toHaveBeenCalledWith({
      relations: { user: true, course: true },
      order: { id: 'DESC' },
      skip: 10,
      take: 10,
    });
    expect(result).toEqual({
      data: [
        {
          id: 1,
          orderNo: '202604282038321003256',
          userId: 6,
          userName: 'zchlon@qq.com',
          nickName: 'zchlon',
          courseId: 15,
          courseTitle: 'What is ChatGPT doing text',
          pricePaid: 120,
          payStatus: 2,
          createTime: orderFixture.createTime,
          updateTime: orderFixture.updateTime,
        },
      ],
      total: 1,
    });
  });
});
