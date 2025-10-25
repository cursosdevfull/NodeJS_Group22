import { NextFunction, Request, Response } from "express";

export const ExcludeFields = (fieldsToExclude: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const originalJson = res.json;

        const removeFieldsByPath = (obj: any, currentPath: string = ""): any => {
            if (obj === null || obj === undefined) {
                return obj;
            }

            if (Array.isArray(obj)) {
                return obj.map((item) => {
                    // Para arrays, mantenemos el mismo currentPath para que "roles.id" se aplique a todos los elementos
                    return removeFieldsByPath(item, currentPath);
                });
            }

            if (typeof obj === "object") {
                const cleanedObj = { ...obj };

                // Verificar y eliminar campos que coincidan exactamente con las rutas especificadas
                Object.keys(cleanedObj).forEach(key => {
                    const fieldPath = currentPath ? `${currentPath}.${key}` : key;

                    // Si la ruta completa del campo está en la lista de exclusión, eliminarlo
                    if (fieldsToExclude.includes(fieldPath)) {
                        delete cleanedObj[key];
                    } else {
                        // Si no se elimina el campo, procesar recursivamente
                        cleanedObj[key] = removeFieldsByPath(cleanedObj[key], fieldPath);
                    }
                });

                return cleanedObj;
            }

            return obj;
        }; res.json = function (body?: any) {
            if (body && typeof body === "object") {
                body = removeFieldsByPath(body);
            }

            return originalJson.call(this, body);
        };

        next();
    };
};