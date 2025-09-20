import { Request, Response } from "express";
import { Course } from "../application/course";
import { CourseApplication } from "../application/course.application";

export class CourseController {
    constructor(private readonly application: CourseApplication) { }

    create(req: Request, res: Response) {
        const { title } = req.body

        const course = new Course(title);
        this.application.create(course);

        res.status(201).json(course);
    }

    update(req: Request, res: Response) {
        const { title } = req.body
        const courseId = Number(req.params.id);

        const course = new Course(title);
        this.application.update(courseId, course);

        res.status(200).json(course);
    }

    delete(req: Request, res: Response) {
        const courseId = Number(req.params.id);
        this.application.delete(courseId);
        res.status(204).send();
    }

    findById(req: Request, res: Response) {
        const courseId = Number(req.params.id);
        const course = this.application.findById(courseId);

        if (!course) {
            return res.status(404).send();
        }

        res.status(200).json(course);
    }

    findAll(req: Request, res: Response) {
        const courses = this.application.findAll();
        res.status(200).json(courses);
    }
}