import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDTO } from '../dto/update-procut.dto';

export const updateProductMock: UpdateProductDTO = {
  categoryId: categoryMock.id,
  image: 'kjbndabk',
  name: 'gdsaga',
  price: 43.0,
};
