import { CreateAddressDto } from './dto/createAddress.dto';
import { Controller, Param, Post, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/:userId')
  async createAddress(
    @Param('userId') userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
