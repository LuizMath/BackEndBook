import { CreateUserDTO } from "../dtos/create-user.dto";
import { prisma } from "../lib/prisma";
import { IUserRepository } from "./interfaces/user-repository.interface";

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<any> {
    return await prisma.user.create({
      data,
    });
  }
  async findByEmail(email: string): Promise<any> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
