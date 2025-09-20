import { Router } from "express";
import { CourseController } from "./course.controller";
import { CourseApplication } from "../application/course.application";
import { CourseAdapter } from "../adapters/course.adapter";
import { CoursePort } from "../ports/course.port";

class CourseRoutes {
    readonly router = Router();

    constructor(private readonly controller: CourseController) {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", this.controller.create.bind(this.controller));
        this.router.put("/:id", this.controller.update.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
        this.router.get("/:id", this.controller.findById.bind(this.controller));
        this.router.get("/", this.controller.findAll.bind(this.controller));
    }
}

const port: CoursePort = new CourseAdapter()
const application = new CourseApplication(port);
const controller: CourseController = new CourseController(application);
export const courseRoutes = new CourseRoutes(controller).router;