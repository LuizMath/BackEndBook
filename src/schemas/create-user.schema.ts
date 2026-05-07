import z from "zod/v4";

export const createUserSchema = z.strictObject({
  name: z.string().min(3, { error: "Nome mínimo de 3 caracteres" }),
  email: z.email({ pattern: z.regexes.email }),
  avatarUrl: z.string(),
});
