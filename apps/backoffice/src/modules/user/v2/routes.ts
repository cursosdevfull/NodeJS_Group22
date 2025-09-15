import { Router } from "express";
import { UserService } from "../service";
import { UserController } from "./controller";

class UserRoutesV2 {
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
    }
}

const service = new UserService()
const controller = new UserController(service);
export const userRoutes = new UserRoutesV2(controller).router;

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