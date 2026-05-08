import { CreateBookDTO } from "../dtos/create-book.dto";
import { prisma } from "../lib/prisma";
import { IBookRepository } from "./interfaces/book-repository.interface";

export class BookRepository implements IBookRepository {
  async create(data: CreateBookDTO): Promise<any> {
    return await prisma.book.create({
      data: { ...data, user: { connect: { email: data.user } } },
    });
  }
  async findAll(title?: string): Promise<any> {
    return await prisma.book.findMany({
      where: title
        ? {
            title: { contains: title },
            deletedAt: null,
          }
        : { deletedAt: null },
    });
  }
}
