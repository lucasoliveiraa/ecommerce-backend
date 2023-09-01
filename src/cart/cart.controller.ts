import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  Param,
  Patch,
} from '@nestjs/common';
import { InsertCart } from './dto/insert-cart.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CartService } from './cart.service';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnCart } from './dto/return-cart.dto';
import { DeleteResult } from 'typeorm';
import { Response } from 'express';
import { UpdateCart } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Roles(UserType.User, UserType.Admin, UserType.Root)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(
    @Body() insertCart: InsertCart,
    @UserId() userId: number,
  ): Promise<ReturnCart> {
    return new ReturnCart(
      await this.cartService.insertProductInCart(insertCart, userId),
    );
  }

  @Get()
  async findCartByUserId(
    @UserId() userId: number,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<ReturnCart> {
    const cart = await this.cartService
      .findCartByUserId(userId, true)
      .catch(() => undefined);

    if (cart) {
      return cart;
    }

    res.status(204).send();

    return;
  }

  @Delete()
  async clearCart(@UserId() userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductCart(productId, userId);
  }

  @Patch()
  async updateProductInCart(
    @Body() updateCart: UpdateCart,
    @UserId() userId: number,
  ): Promise<ReturnCart> {
    return new ReturnCart(
      await this.cartService.updateProductInCart(updateCart, userId),
    );
  }
}
