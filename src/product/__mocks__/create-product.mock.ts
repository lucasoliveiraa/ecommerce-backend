import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProduct } from '../dto/create-product.dto';

export const createProductMock: CreateProduct = {
  categoryId: categoryMock.id,
  image: 'lkfdjsafkldsa',
  name: 'name mock product',
  price: 25.0,
};
