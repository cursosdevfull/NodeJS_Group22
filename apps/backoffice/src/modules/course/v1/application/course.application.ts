import { CoursePort } from "../ports/course.port";
import { Course } from "./course";

export class CourseApplication {
    constructor(private readonly coursePort: CoursePort) { }

    create(course: Course) {
        this.coursePort.create(course);
    }

    update(courseId: number, course: Course) {
        this.coursePort.update(courseId, course);
    }

    delete(courseId: number) {
        this.coursePort.delete(courseId);
    }

    findById(courseId: number): Course | null {
        return this.coursePort.findById(courseId);
    }

    findAll(): Course[] {
        return this.coursePort.findAll();
    }
}