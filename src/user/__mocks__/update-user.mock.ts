import { UpdatePassword } from '../dto/updateUser.dto';

export const updatePasswordMock: UpdatePassword = {
  lastPassword: 'abc',
  newPassword: 'fdsafj',
};

export const updatePasswordInvalidMock: UpdatePassword = {
  lastPassword: 'lkfdjsa',
  newPassword: 'flkjbla',
};
