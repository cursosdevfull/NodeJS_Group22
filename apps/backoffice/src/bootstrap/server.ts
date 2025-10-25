import { env } from "@core";
import { Application } from "express";
import http from "http";
import { IBootstrap } from "./bootstrap";

export class Server implements IBootstrap<string> {
    constructor(private readonly app: Application) { }

    initialize(): Promise<string> {
        const PORT = env.PORT;

        const server = http.createServer(this.app);
        server.listen(PORT)

        return new Promise((resolve, reject) => {
            server.on("listening", () => {
                console.log(`Server running on port ${PORT}`);
                resolve(`Server running on port ${PORT}`);
            });
            server.on("error", (error) => {
                console.log(`Error: ${error}`);
                reject(`Error: ${error}`);
            });
        });
    }
}
