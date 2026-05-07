import { CreateUserDto } from "../../dtos/create-user.dto";
export interface IUserRepository {
  create(data: CreateUserDto): Promise<any>;
  findByEmail(data: Omit<CreateUserDto, "name" | "avatarUrl">): Promise<any>;
}
