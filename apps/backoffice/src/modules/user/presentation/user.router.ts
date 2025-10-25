import { Router } from "express";
import { UserController } from "./user.controller";
import { UserAdapter, UserApplication, UserPort } from "@user";
import { ExcludeFields } from "core/middlewares/exclude-fields";
import { AuthenticationGuard } from "core/middlewares/auth/authentication";
import { AuthorizationGuard } from "core/middlewares/auth/authorization";
import { Cache } from "core/middlewares/cache/cache";

class UserRouter {
    readonly router = Router();

    constructor(private readonly controller: UserController) {
        this.mountRoutes();
    }

    private mountRoutes() {
        this.router.post("/", AuthenticationGuard.canActivate, this.controller.createUser.bind(this.controller));
        this.router.put("/:userId", AuthenticationGuard.canActivate, this.controller.updateUser.bind(this.controller));
        this.router.delete("/:userId", AuthenticationGuard.canActivate, this.controller.deleteUser.bind(this.controller));
        this.router.get("/page", AuthenticationGuard.canActivate, Cache.build("USER"), this.controller.getUsersByPage.bind(this.controller));
        this.router.get("/:userId", AuthenticationGuard.canActivate, Cache.build("USER"), this.controller.getUserById.bind(this.controller));
        this.router.get("/", AuthenticationGuard.canActivate, AuthorizationGuard.canActivate("ADMIN", "USER"), Cache.build("USER"), ExcludeFields(["createdAt", "updatedAt", "roles.name", "roles.createdAt", "roles.updatedAt"]), this.controller.getAllUsers.bind(this.controller));
    }
}

const userPort: UserPort = new UserAdapter()
const userApplication = new UserApplication(userPort)
const userController = new UserController(userApplication)

export const router = new UserRouter(userController).router