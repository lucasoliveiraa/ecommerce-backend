import { Body, Controller, Post } from '@nestjs/common';
import { InsertCart } from './dto/insert-cart.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnCart } from './dto/return-cart.dto';

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
}
