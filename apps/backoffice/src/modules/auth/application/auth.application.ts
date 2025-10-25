import { Auth, AuthPort } from "@auth";
import { Encrypt, Token } from "@core";
import { v4 as uuidv4 } from 'uuid';

export class AuthApplication {
    constructor(private readonly authPort: AuthPort) { }

    async login(auth: Auth) {
        const userFound = await this.authPort.findByEmail(auth.toJSON().email);

        if (!userFound) return null;

        const { name, email, roles, password, refreshToken } = userFound.toJSON()

        const matchPassword = Encrypt.comparePasswords(auth.toJSON().password, password);

        if (!matchPassword) return null;

        return {
            accessToken: Token.generateAccessToken(name, email, roles.map(role => ({ name: role.name! }))),
            refreshToken
        };
    }

    async getNewAccessToken(refreshToken: string) {
        const userFound = await this.authPort.findByRefreshToken(refreshToken);

        if (!userFound) return null;

        userFound.update({ refreshToken: uuidv4() })

        const { name, email, roles, refreshToken: newRefreshToken } = userFound.toJSON()

        await this.authPort.updateUser(userFound);

        return {
            accessToken: Token.generateAccessToken(name, email, roles.map(role => ({ name: role.name! }))),
            refreshToken: newRefreshToken
        };
    }
}