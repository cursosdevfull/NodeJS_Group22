import { Token } from 'core/utils/token';
import { Request, Response, NextFunction } from 'express';

export class AuthenticationGuard {
    static canActivate(request: Request, response: Response, next: NextFunction) {
        const authHeader = request.headers['authorization'];
        if (!authHeader) return response.status(401).json({ message: 'Unauthorized' });

        const startsWithBearer = authHeader.startsWith('Bearer ');
        if (!startsWithBearer) return response.status(401).json({ message: 'Unauthorized' });

        const token = authHeader.split(' ')[1];
        if (!token) return response.status(401).json({ message: 'Unauthorized' });

        const validateAccessToken = Token.verifyAccessToken(token);

        if (!validateAccessToken.valid) {
            if (validateAccessToken.expired) {
                return response.status(403).json({ message: 'Token expired' });
            } else {
                return response.status(401).json({ message: 'Unauthorized' });
            }
        }

        const payload = validateAccessToken.payload;
        const rolesUser = payload.roles

        response.locals.rolesUser = rolesUser;

        next();
    }
}