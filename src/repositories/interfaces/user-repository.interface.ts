import { CreateUserDTO } from "../../dtos/create-user.dto";
export interface IUserRepository {
  create(data: CreateUserDTO): Promise<any>;
  findByEmail(email: string): Promise<any>;
}
