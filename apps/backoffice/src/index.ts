import http from "http"
import { app } from "./app"
import { env } from "./env"

const server = http.createServer(app)

const PORT = env.PORT

server.listen(PORT)
    .on("listening", () => {
        console.log(`Server running at http://localhost:${PORT}/`)
    })
    .on("error", (err) => {
        console.error("Server error:", err)
    })