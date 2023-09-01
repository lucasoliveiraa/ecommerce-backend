import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ReturnProduct } from './dto/return-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CreateProduct } from './dto/create-product.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { DeleteResult } from 'typeorm';
import { UpdateProduct } from './dto/update-product.dto';
import { ReturnPriceDeliveryDto } from './dto/return-price-delivery.dto';
import { Pagination } from '../dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
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

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/page')
  async findAllPage(
    @Query('search') search?: string,
    @Query('size') size?: number,
    @Query('page') page?: number,
  ): Promise<Pagination<ReturnProduct[]>> {
    return this.productService.findAllPage(search, size, page);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/:productId')
  async findProductById(
    @Param('productId') productId: number,
  ): Promise<ReturnProduct> {
    return new ReturnProduct(
      await this.productService.findProductById(productId, true),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProduct,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createProduct);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return this.productService.deleteProduct(productId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Put('/:productId')
  async updateProduct(
    @Body() updateProduct: UpdateProduct,
    @Param('productId') productId: number,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(updateProduct, productId);
  }

  @Get('/:idProduct/delivery/:cep')
  async findPriceDelivery(
    @Param('idProduct') idProduct: number,
    @Param('cep') cep: string,
  ): Promise<ReturnPriceDeliveryDto> {
    return this.productService.findPriceDelivery(cep, idProduct);
  }
}
