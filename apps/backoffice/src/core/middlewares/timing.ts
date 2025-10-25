import { NextFunction, Request, Response } from "express";

export const Timing = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();

    res.on("finish", () => {
        const duration = process.hrtime(start)
        const ms = (duration[0] * 1e9 + duration[1]) / 1e6;
        console.log(` Request to ${req.method} ${req.originalUrl} took ${ms.toFixed(2)} ms`);
    })

    next()
}