import { IsNumber, IsString } from 'class-validator';

export class CreateProduct {
  @IsNumber()
  categoryId: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  // @IsOptional()
  // @IsNumber()
  // weight?: number;

  // @IsOptional()
  // @IsNumber()
  // length?: number;

  // @IsOptional()
  // @IsNumber()
  // height?: number;

  // @IsOptional()
  // @IsNumber()
  // width?: number;

  // @IsOptional()
  // @IsNumber()
  // diameter?: number;
}
