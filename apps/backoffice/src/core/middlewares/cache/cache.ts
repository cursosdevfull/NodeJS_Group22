import { Redis } from "@bootstrap";
import { NextFunction, Request, Response } from "express";

export class Cache {
    private static getParameters(params: Record<string, any>): string {
        return Object.values(params).join("_")
    }

    static build(prefix: string) {
        return async (request: Request, response: Response, next: NextFunction) => {
            const parameters = {
                query: this.getParameters(request.query),
                params: this.getParameters(request.params),
                body: this.getParameters(request.body || {}),
            }

            const key = `${prefix}:${parameters.query}:${parameters.params}:${parameters.body}`;

            const client = Redis.redisClient;
            const cached = await client.get(key);

            if (cached) {
                console.log("Cache hit:", key);
                return response.json(JSON.parse(cached));
            }

            response.locals.cacheKey = key;
            next()
        }
    }
}