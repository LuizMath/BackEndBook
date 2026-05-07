import { IUserRepository } from "../repositories/interfaces/user-repository.interface";
import { CreateUserDto } from "../dtos/create-user.dto";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: CreateUserDto) {
    const { email } = data;
    const userExists = await this.userRepository.findByEmail(data);
    if (userExists) {
      throw Error("Email já cadastrado");
    }
    return this.userRepository.create(data);
  }
}
