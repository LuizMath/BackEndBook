import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";

const userController = new UserController();

export default async function (app: FastifyInstance) {
  app.post("/user/create", (req, reply) => userController.create(req, reply));
}
