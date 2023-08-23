import { IsNumber } from 'class-validator';

export class UpdateCart {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
