import express from 'express';
import { router as userRouter } from "./modules/user/presentation/user.router";
import { router as authRouter } from "./modules/auth/presentation/auth.router";
import { FormatData, ProtectPersonalInfo, Timing } from '@core';
import { AuthenticationGuard } from 'core/middlewares/auth/authentication';
import { Database, Redis } from '@bootstrap';

class App {
    readonly app = express()

    constructor() {
        this.mountMiddlewares()
        this.mountHealthCheck()
        this.mountRoutes();
    }

    private mountMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }))
        this.app.use(ProtectPersonalInfo)
        this.app.use(FormatData)
        this.app.use(Timing)
    }

    private mountHealthCheck() {
        this.app.get("/health-check", async (req, res) => {
            const healthStatus = {
                status: "OK",
                timestamp: new Date().toISOString(),
                services: {
                    server: "UP",
                    database: "DOWN",
                    redis: "DOWN"
                }
            };

            try {
                // Verificar conexión a MySQL
                if (Database.dataSource && Database.dataSource.isInitialized) {
                    await Database.dataSource.query('SELECT 1');
                    healthStatus.services.database = "UP";
                }
            } catch (error) {
                console.error("Database health check failed:", error);
                healthStatus.services.database = "DOWN";
                healthStatus.status = "DEGRADED";
            }

            try {
                // Verificar conexión a Redis
                if (Redis.redisClient) {
                    await Redis.redisClient.ping();
                    healthStatus.services.redis = "UP";
                }
            } catch (error) {
                console.error("Redis health check failed:", error);
                healthStatus.services.redis = "DOWN";
                healthStatus.status = "DEGRADED";
            }

            // Determinar el estado general
            const allServicesUp = Object.values(healthStatus.services).every(status => status === "UP");
            if (!allServicesUp) {
                healthStatus.status = "DEGRADED";
            }

            // Si algún servicio crítico está caído, devolver 503
            if (healthStatus.services.database === "DOWN" || healthStatus.services.redis === "DOWN") {
                return res.status(503).json(healthStatus);
            }

            res.status(200).json(healthStatus);
        })
    }

    private mountRoutes() {
        this.app.use("/user", /* AuthenticationGuard.canActivate, */ userRouter)
        this.app.use("/auth", authRouter)
    }
}

export default new App().app

