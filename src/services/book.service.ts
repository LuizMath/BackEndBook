import { CreateBookDTO } from "../dtos/create-book.dto";
import { IBookRepository } from "../repositories/interfaces/book-repository.interface";

export class BookService {
  constructor(private bookRepository: IBookRepository) {}
  async createBook(data: CreateBookDTO) {
    return this.bookRepository.create(data);
  }
  async findAllBooks(title?: string) {
    return this.bookRepository.findAll(title);
  }
}
