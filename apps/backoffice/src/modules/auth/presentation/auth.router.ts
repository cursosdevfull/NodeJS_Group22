import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthPort } from "../ports/auth.port";
import { AuthAdapter } from "../adapters/auth.adapter";
import { AuthApplication } from "../application/auth.application";

class AuthRouter {
    router = Router();

    constructor(private readonly controller: any) {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.post("/login", this.controller.login.bind(this.controller));
        this.router.post("/get-new-access-token", this.controller.getNewAccessToken.bind(this.controller));
    }
}

const port: AuthPort = new AuthAdapter()
const application = new AuthApplication(port)
const controller = new AuthController(application)
export const router = new AuthRouter(controller).router