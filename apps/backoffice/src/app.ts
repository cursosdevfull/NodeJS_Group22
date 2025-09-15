import express, { Application } from "express";
import { cpuUsage, memoryUsage } from "process";
import { userRoutes as userRoutesV1 } from "./modules/user/v1/routes";
import { userRoutes as userRoutesV2 } from "./modules/user/v2/routes";

class App {
    readonly app: Application = express();

    constructor() {
        this.mountMiddlewares();
        this.mountHealthCheck();
        this.mountRoutes();
    }

    private mountMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true, limit: "500mb" }));
    }

    private mountHealthCheck(): void {
        const cbHealthCheck = (req: express.Request, res: express.Response) => {
            const memory = memoryUsage();
            const cpu = cpuUsage();

            res.status(200).json({
                application: {
                    status: "Up",
                    info: {
                        uptime: process.uptime(),
                        cpuUsage: cpu,
                        memoryUsage: memory,
                    }
                },
            });
        }

        this.app.get("/healthcheck", cbHealthCheck);
        this.app.get("/", cbHealthCheck);
    }

    private mountRoutes(): void {
        this.app.use("/v1/user", userRoutesV1);
        this.app.use("/v2/user", userRoutesV2);
    }
}

export const app = new App().app;
