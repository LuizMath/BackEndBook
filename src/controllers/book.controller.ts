import { FastifyReply, FastifyRequest } from "fastify";
import { BookRepository } from "../repositories/book.repository";
import { BookService } from "../services/book.service";
import { createBookSchema } from "../schemas/create-book.schema";
import { findBookSchema } from "../schemas/find-book.schema";

const bookService = new BookService(new BookRepository());

export class BookController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const result = createBookSchema.safeParse(req.body);
    if (!result.success) {
      throw req.server.httpErrors.badRequest("Dados inválidos!");
    }
    const data = result.data;
    const book = await bookService.createBook(data);
    return reply.status(201).send({ message: "Livro cadastrado com sucesso!" });
  }
  async findAll(req: FastifyRequest, reply: FastifyReply) {
    const result = findBookSchema.safeParse(req.query);
    if (!result.success) {
      throw req.server.httpErrors.badRequest("Dados inválidos!");
    }
    const { title } = result.data;
    const foundBooks = await bookService.findAllBooks(title);
    return reply.status(200).send({ foundBooks });
  }
}
