import { validate } from 'class-validator';
import express from 'express';
export const validator = (schema: any) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('Validating request body:', req.body);
        const instance = new schema();
        console.log('Schema instance created:', instance);
        Object.assign(instance, req.body);

        console.log('Instance to validate:', instance);

        const errors = await validate(instance);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        next();
    }
}

export async function validateRequestBody(schema: any, body: any) {
    const { errors } = await schema.validate(body);
    return errors.length > 0 ? errors : null;
}