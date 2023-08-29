import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ReturnProduct } from './dto/return-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CreateProduct } from './dto/create-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { DeleteResult } from 'typeorm';
import { UpdateProduct } from './dto/update-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async findAll(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll([], true)).map(
      product => new ReturnProduct(product),
    );
  }

  @Roles(UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProduct,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserType.Admin)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }

  @Roles(UserType.Admin)
  @Put('/:productId')
  async updateProduct(
    @Body() updateProduct: UpdateProduct,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProduct, productId);
  }
}
