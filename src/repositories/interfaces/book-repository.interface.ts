import { CreateBookDTO } from "../../dtos/create-book.dto";

export interface IBookRepository {
  create(data: CreateBookDTO): Promise<any>;
  findAll(title?: string): Promise<any>;
}
