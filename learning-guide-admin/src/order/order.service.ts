import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderListDto } from './dto/order-list.dto';
import { Order } from './entities/order.entity';
import { OrderListItemVo } from './vo/order-list.vo';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findPage(
    query: OrderListDto,
  ): Promise<{ data: OrderListItemVo[]; total: number }> {
    const { pageNum, pageSize } = query;
    const [orders, total] = await this.orderRepository.findAndCount({
      relations: { user: true, course: true },
      order: { id: 'DESC' },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: orders.map((order) => ({
        id: order.id,
        orderNo: order.orderNo,
        userId: order.userId,
        userName: order.user?.username ?? null,
        nickName: order.user?.nickname ?? null,
        courseId: order.courseId,
        courseTitle: order.course?.title ?? null,
        pricePaid: Number(order.pricePaid ?? 0),
        payStatus: order.payStatus,
        createTime: order.createTime,
        updateTime: order.updateTime,
      })),
      total,
    };
  }
}
