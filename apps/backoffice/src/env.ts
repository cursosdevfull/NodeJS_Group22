import * as z from "zod";

const schema = z.object({
    PORT: z.coerce.number().default(5000),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().default("user"),
    DB_PASS: z.string().default("12345"),
    DB_NAME: z.string().default("db"),
})

export const env: z.infer<typeof schema> = schema.parse(process.env)