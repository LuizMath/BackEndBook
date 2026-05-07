import { CreateUserDto } from "../dtos/create-user.dto";
import { prisma } from "../lib/prisma";
import { IUserRepository } from "./interfaces/user-repository.interface";

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDto): Promise<any> {
    return await prisma.user.create({
      data,
    });
  }
  async findByEmail(
    data: Omit<CreateUserDto, "name" | "avatarUrl">
  ): Promise<any> {
    const { email } = data;
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}
