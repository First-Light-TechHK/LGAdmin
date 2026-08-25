import { Body, Controller, Post } from '@nestjs/common';
import { OrderListDto } from './dto/order-list.dto';
import { OrderService } from './order.service';
import { OrderListVo } from './vo/order-list.vo';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('list')
  async findPage(@Body() query: OrderListDto): Promise<OrderListVo> {
    const result = await this.orderService.findPage(query);
    return {
      code: 0,
      data: result.data,
      msg: 'success',
      total: result.total,
    };
  }
}
