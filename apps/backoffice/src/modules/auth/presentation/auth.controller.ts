import { Auth, AuthApplication } from "@auth";
import { Request, Response } from "express";

export class AuthController {
    constructor(private readonly authApplication: AuthApplication) { }

    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        const auth = new Auth(email, password);

        const result = await this.authApplication.login(auth);
        if (!result) return response.status(401).json({ message: "Invalid credentials" });
        return response.json(result);
    }

    async getNewAccessToken(request: Request, response: Response) {
        const { refreshToken } = request.body;

        const result = await this.authApplication.getNewAccessToken(refreshToken);
        if (!result) return response.status(401).json({ message: "Invalid refresh token" });
        return response.json(result);
    }
}