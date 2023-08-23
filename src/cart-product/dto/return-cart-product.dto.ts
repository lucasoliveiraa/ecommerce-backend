import { ReturnCart } from '../../cart/dto/return-cart.dto';
import { ReturnProduct } from '../../product/dto/return-product.dto';
import { CartProductEntity } from '../entities/cart-product.entity';

export class ReturnCartProduct {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ReturnProduct;
  cart?: ReturnCart;

  constructor(cartProduct: CartProductEntity) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cartId;
    this.productId = cartProduct.productId;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProduct(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart ? new ReturnCart(cartProduct.cart) : undefined;
  }
}
