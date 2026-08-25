import { Order } from '../../src/order/entities/order.entity';
import { courseFixture } from './course.fixture';
import { userFixture } from './user.fixture';

export const orderFixture: Order = {
  id: 1,
  orderNo: '202604282038321003256',
  userId: 6,
  courseId: 15,
  pricePaid: '120.00',
  payStatus: 2,
  createTime: new Date('2026-04-28T20:38:32'),
  updateTime: new Date('2026-04-28T20:38:32'),
  user: {
    ...userFixture,
    id: 6,
    username: 'zchlon@qq.com',
    nickname: 'zchlon',
  },
  course: {
    ...courseFixture,
    id: 15,
    title: 'What is ChatGPT doing text',
  },
};
