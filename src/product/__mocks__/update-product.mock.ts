import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProduct } from '../dto/update-procut.dto';

export const updateProductMock: UpdateProduct = {
  categoryId: categoryMock.id,
  image: 'kjbndabk',
  name: 'gdsaga',
  price: 43.0,
};
