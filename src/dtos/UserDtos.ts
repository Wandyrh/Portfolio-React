export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface UpdateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}