import { NextFunction, Request, Response } from "express";

export const FormatData = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    res.json = function (body?: any) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            return originalJson.call(this, {
                provider: "CursosDev",
                status: "success",
                result: {
                    response: body
                }
            })
        } else {
            return originalJson.call(this, {
                provider: "CursosDev",
                status: "error",
                statusCode: res.statusCode,
                result: {
                    response: body
                }
            })
        }
    }

    next()
}