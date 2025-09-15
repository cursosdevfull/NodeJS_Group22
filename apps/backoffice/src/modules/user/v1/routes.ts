import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../service";
import { validator } from "../../core/validators/generic";
import { UserCreateValidator } from "./validators/user-create";

class UserRoutes {
    readonly router = Router();
    readonly controller: UserController;

    constructor(controller: UserController) {
        this.controller = controller
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/",
            this.controller.getUserList.bind(this.controller)
        );

        this.router.post("/", validator(UserCreateValidator), this.controller.createUser.bind(this.controller));
    }
}

const service = new UserService()
const controller = new UserController(service);
export const userRoutes = new UserRoutes(controller).router;

/*class UserControllerFake {
    getUserList(req: any, res: any) {
        res.status(200).json([
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" },
        ]);
    }
}


const controllerFake = {
    getUserList: (req: any, res: any) => {
        res.status(200).json([
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
            { id: 3, name: "Charlie" },
        ]);
    }
}

//const controllerFake = new UserControllerFake() as UserController
export const userRoutesFake = new UserRoutes(controllerFake as UserController).router;*/