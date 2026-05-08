import { IUserRepository } from "../repositories/interfaces/user-repository.interface";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { ConflictError } from "../errors/conflict-error";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: CreateUserDTO) {
    const { email } = data;
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new ConflictError("Email já existe!");
    }
    return this.userRepository.create(data);
  }
}
