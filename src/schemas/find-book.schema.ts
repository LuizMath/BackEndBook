import z from "zod/v4";

export const findBookSchema = z.strictObject({
  title: z.string().optional(),
});
