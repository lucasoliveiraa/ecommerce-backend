import { cityMock } from '../../city/__mocks__/city.mock';
import { CreateAddress } from '../dto/createAddress.dto';
import { addressMock } from './address.mock';

export const createAddressMock: CreateAddress = {
  cep: addressMock.cep,
  cityId: cityMock.id,
  complement: addressMock.complement,
  numberAddress: addressMock.numberAddress,
};
