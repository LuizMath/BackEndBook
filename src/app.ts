import fastifySensible from "@fastify/sensible";
import fastify from "fastify";
import userRoutes from "./routes/user.routes";

export const app = fastify({
  logger: true,
});

app.register(fastifySensible);
app.register(userRoutes);
