import createError from "@fastify/error";

export const ConflictError = createError("CONFLICT_ERROR", "%s", 409);
