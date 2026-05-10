import fastifySensible from "@fastify/sensible";
import fastify from "fastify";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import cors from "@fastify/cors";

export const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
});
app.register(fastifySensible);
app.register(userRoutes);
app.register(bookRoutes);

app.setErrorHandler((error: any, req, reply) => {
  const statusCode = error.statusCode ?? 500;
  req.log.error(error);
  switch (error.code) {
    case "P2002":
      return reply.conflict("Chave duplicada!");
    case "P2025":
      return reply.notFound("Registro não encontrado!");
    case "P2003":
      return reply.badRequest("Relacionamento inválido!");
    default:
      return reply.status(statusCode).send({
        statusCode,
        error: error.name ?? "Erro",
        message: error.message ?? "Erro interno no servidor!",
      });
  }
});
