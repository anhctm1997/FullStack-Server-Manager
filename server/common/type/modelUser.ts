import { CreateUserDto } from "../../models/user/dto/create.user.dto";

export interface ModelUser extends CreateUserDto {
  _id: string;
}
