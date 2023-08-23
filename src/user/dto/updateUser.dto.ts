import { IsString } from 'class-validator';

export class UpdatePassword {
  @IsString()
  newPassword: string;

  @IsString()
  lastPassword: string;
}
