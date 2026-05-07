import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { createUserSchema } from "../schemas/create-user.schema";
import { da } from "zod/locales";

const userService = new UserService(new UserRepository());

export class UserController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const result = createUserSchema.safeParse(req.body);
    if (!result.success) {
      throw req.server.httpErrors.badRequest("Dados Inválidos");
    }
    const data = result.data;
    const user = await userService.createUser(data);
    return reply.status(201).send({ message: "Usuário criado com sucesso!" });
  }
}
