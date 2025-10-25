import "dotenv/config"
import "@core"
import { Server, Database, Redis } from "@bootstrap";
import app from "./app"


(async () => {
    try {
        const server = new Server(app);
        const database = new Database();
        const redis = new Redis();

        const bootstrapPromises = [
            server.initialize(),
            database.initialize(),
            redis.initialize(),
        ]

        await Promise.all(bootstrapPromises);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error during application bootstrap:", error);
        process.exit(1);
    }
})()