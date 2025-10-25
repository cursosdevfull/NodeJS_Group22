import { env } from "core/env";
import * as jwt from "jsonwebtoken";


type ResultVerifyAccessToken = |
{ valid: true; expired: false; payload: any } |
{ valid: false; expired: true } |
{ valid: false; expired: false };

export class Token {
    static generateAccessToken(name: string, email: string, roles: { name: string }[]): string {
        const payload = {
            name: name,
            email: email,
            roles: roles.map(role => role.name)
        }

        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] });
    }

    static verifyAccessToken(token: string): ResultVerifyAccessToken {
        try {
            const payload = jwt.verify(token, env.JWT_SECRET);
            return { valid: true, expired: false, payload };
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return { valid: false, expired: true };
            } else {
                return { valid: false, expired: false };
            }
        }

    }
}