import { productMock } from '../../product/__mocks__/product.mock';
import { UpdateCart } from '../dto/update-cart.dto';

export const updateCartMock: UpdateCart = {
  amount: 54638,
  productId: productMock.id,
};
