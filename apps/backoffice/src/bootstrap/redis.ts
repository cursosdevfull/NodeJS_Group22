import { env } from "@core";
import { IBootstrap } from "./bootstrap";
import IORedis from "ioredis";

export class Redis implements IBootstrap<string> {
    private static client: IORedis

    initialize(): Promise<string> {
        const client = new IORedis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            password: env.REDIS_PASSWORD,
        })

        return new Promise((resolve, reject) => {
            client
                .on("connect", () => {
                    Redis.client = client;
                    console.log("Redis connected sucessfully");
                    resolve("Redis connected successfully");
                })
                .on("error", (error) => {
                    console.error("Redis connection error:", error);
                    reject(`Error: ${error}`);
                })
        })
    }

    static get redisClient(): IORedis {
        if (!Redis.client) {
            throw new Error("Redis client is not initialized");
        }
        return Redis.client;
    }

    static async set(key: string, value: string) {
        if (!Redis.client) {
            throw new Error("Redis client is not initialized");
        }

        return Redis.client.set(key, value, "PX", env.REDIS_EXPIRATION);
    }

    static async get(key: string) {
        if (!Redis.client) {
            throw new Error("Redis client is not initialized");
        }

        return Redis.client.get(key);
    }

    static async clear(prefix: string = "") {
        if (!Redis.client) {
            throw new Error("Redis client is not initialized");
        }

        const keys = await Redis.client.keys(`${prefix}*`);
        if (keys.length === 0) {
            console.log("No keys found");
            return;
        }

        const pipeline = Redis.client.pipeline();
        keys.forEach((key) => {
            pipeline.del(key);
        });

        await pipeline.exec();
        console.log(`Cleared ${keys.length} keys`);
    }
}