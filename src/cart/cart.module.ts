import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';
import { CartController } from './cart.controller';
import { CartProductModule } from '../cart-product/cart-product.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), CartProductModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}