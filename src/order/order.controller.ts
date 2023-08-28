import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UserId } from '../decorators/user-id.decorator';
import { OrderEntity } from './entities/order.entity';
import { Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDTO: CreateOrderDTO,
    @UserId() userId: number,
  ) {
    return this.orderService.createOrder(createOrderDTO, userId);
  }

  @Get()
  async findOrdersByUserId(
    @UserId() userId: number,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<OrderEntity[]> {
    const orders = await this.orderService
      .findOrdersByUserId(userId)
      .catch(() => undefined);

    if (orders) {
      return orders;
    }

    res.status(204).send();
    return;
  }
}
