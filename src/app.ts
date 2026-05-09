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
