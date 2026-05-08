import z from "zod/v4";

export const createBookSchema = z.strictObject({
  title: z.string().min(3, "Digite mais carácteres!"),
  author: z.string().min(3, "Digite mais carácteres!"),
  publishedYear: z
    .int("Ano deve ser um número inteiro")
    .min(1000, "Ano inválido")
    .max(new Date().getFullYear(), "Ano não pode ser no futuro"),
  user: z.email({ pattern: z.regexes.email, error: "Email Inválido" }),
});
