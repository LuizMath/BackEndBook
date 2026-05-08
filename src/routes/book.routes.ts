import { FastifyInstance } from "fastify";
import { BookController } from "../controllers/book.controller";

const bookController = new BookController();

export default async function (app: FastifyInstance) {
  app.post("/book/create", (req, reply) => bookController.create(req, reply));
  app.get("/book", (req, reply) => bookController.findAll(req, reply));
}
