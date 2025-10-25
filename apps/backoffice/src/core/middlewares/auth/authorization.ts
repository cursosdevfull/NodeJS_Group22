import { NextFunction, Request, Response } from "express";

export class AuthorizationGuard {
    static canActivate(...rolesAllowed: string[]) {
        return (request: Request, response: Response, next: NextFunction) => {
            const rolesUser: string[] = response.locals.rolesUser

            const hasRoleAllowed = rolesUser.some(roleUser => rolesAllowed.includes(roleUser))

            if (!hasRoleAllowed) {
                return response.status(403).json({ message: 'Forbidden' });
            }

            next();
        }

    }
}