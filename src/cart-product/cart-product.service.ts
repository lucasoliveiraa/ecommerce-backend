import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { ProductService } from '../product/product.service';
import { InsertCart } from '../cart/dto/insert-cart.dto';
import { UpdateCart } from '../cart/dto/update-cart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }

    return cartProduct;
  }

  async createProductInCart(
    insertCart: InsertCart,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      amount: insertCart.amount,
      productId: insertCart.productId,
      cartId,
    });
  }

  async insertProductInCart(
    insertCart: InsertCart,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(insertCart.productId);

    const cartProduct = await this.verifyProductInCart(
      insertCart.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductInCart(insertCart, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertCart.amount,
    });
  }

  async updateProductInCart(
    updateCart: UpdateCart,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(updateCart.productId);

    const cartProduct = await this.verifyProductInCart(
      updateCart.productId,
      cart.id,
    );

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: updateCart.amount,
    });
  }

  async deleteProductCart(
    productId: number,
    cartId: number,
  ): Promise<DeleteResult> {
    return this.cartProductRepository.delete({ productId, cartId });
  }
}
