import { productMock } from '../../product/__mocks__/product.mock';
import { InsertCart } from '../dto/insert-cart.dto';

export const insertCartMock: InsertCart = {
  amount: 535,
  productId: productMock.id,
};
