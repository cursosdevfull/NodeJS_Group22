import { NextFunction, Request, Response } from "express";

export const ProtectPersonalInfo = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    const sensitiveFields = ["password", "secret", "isActive"];

    const removeSensitiveFields = (obj: any): any => {
        if (obj === null || obj === undefined) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => removeSensitiveFields(item));
        }

        if (typeof obj === "object") {
            const cleanedObj = { ...obj };

            // Eliminar campos sensibles del objeto actual
            sensitiveFields.forEach(field => {
                if (cleanedObj.hasOwnProperty(field)) {
                    delete cleanedObj[field];
                }
            });

            // Aplicar recursivamente a todas las propiedades del objeto
            Object.keys(cleanedObj).forEach(key => {
                cleanedObj[key] = removeSensitiveFields(cleanedObj[key]);
            });

            return cleanedObj;
        }

        return obj;
    };

    res.json = function (body?: any) {
        if (body && typeof body === "object") {
            body = removeSensitiveFields(body);
        }

        return originalJson.call(this, body)
    }

    next()
}