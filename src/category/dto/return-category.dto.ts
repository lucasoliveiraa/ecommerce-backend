// import { ReturnProduct } from '../../product/dto/return-product.dto';
import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategory {
  id: number;
  name: string;
  amountProducts?: number;
  // products?: ReturnProduct[];

  constructor(categoryEntity: CategoryEntity, amountProducts?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountProducts = amountProducts;
    // this.products = categoryEntity.products
    //   ? categoryEntity.products.map(product => new ReturnProduct(product))
    //   : undefined;
  }
}
