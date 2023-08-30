import { IsNumber, IsString } from 'class-validator';

export class UpdateProduct {
  @IsNumber()
  categoryId: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;

  @IsNumber()
  weight?: number;

  @IsNumber()
  length?: number;

  @IsNumber()
  height?: number;

  @IsNumber()
  width?: number;

  @IsNumber()
  diameter?: number;
}
