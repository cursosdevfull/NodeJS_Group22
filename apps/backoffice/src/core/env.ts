import { z } from "zod"

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]),
    PORT: z.coerce.number(),
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_NAME: z.string(),
    DB_SYNC: z.coerce.string(),
    DB_LOGG: z.coerce.string(),
    DB_POOL_SIZE: z.coerce.number(),
    DB_MAX_QUERY_EXECUTION_TIME: z.coerce.number(),
    JWT_SECRET: z.string().default("defaultSecret"),
    JWT_EXPIRES_IN: z.string().default("1h"),
    REDIS_HOST: z.string(),
    REDIS_PORT: z.coerce.number(),
    REDIS_PASSWORD: z.string(),
    REDIS_EXPIRATION: z.coerce.number()
})

type Env = z.infer<typeof envSchema>

export const env: Env = envSchema.parse(process.env)