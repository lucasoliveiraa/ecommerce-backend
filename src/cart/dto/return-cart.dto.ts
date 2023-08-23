import { ReturnCartProduct } from '../../cart-product/dto/return-cart-product.dto';
import { CartEntity } from '../entities/cart.entity';

export class ReturnCart {
  id: number;
  cartProduct?: ReturnCartProduct[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProduct = cart.cartProduct
      ? cart.cartProduct.map(cartProduct => new ReturnCartProduct(cartProduct))
      : undefined;
  }
}
