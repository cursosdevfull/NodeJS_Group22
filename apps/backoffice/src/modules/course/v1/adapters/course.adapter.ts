import { Course } from "../application/course";
import { CoursePort } from "../ports/course.port";

export class CourseAdapter implements CoursePort {
    create(course: Course): void {
        throw new Error("Method not implemented.");
    }
    update(courseId: number, course: Course): void {
        throw new Error("Method not implemented.");
    }
    delete(courseId: number): void {
        throw new Error("Method not implemented.");
    }
    findById(courseId: number): Course | null {
        throw new Error("Method not implemented.");
    }
    findAll(): Course[] {
        throw new Error("Method not implemented.");
    }

}