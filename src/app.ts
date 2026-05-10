import fastifySensible from "@fastify/sensible";
import rateLimit from "@fastify/rate-limit";
import type {} from "@fastify/rate-limit";
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

await app.register(rateLimit, { global: false });

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

app.setNotFoundHandler(
  {
    preHandler: app.rateLimit({
      max: 3,
      timeWindow: 500,
    }),
  },
  (request, reply) => {
    request.log.warn(
      {
        request: {
          method: request.method,
          url: request.url,
          query: request.query,
          params: request.params,
        },
      },
      "Resource not found"
    );

    reply.code(404);

    return { message: "Not Found" };
  }
);
