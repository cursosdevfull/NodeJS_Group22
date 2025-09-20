import { Course } from "../application/course";

export interface CoursePort {
    create(course: Course): void
    update(courseId: number, course: Course): void
    delete(courseId: number): void
    findById(courseId: number): Course | null
    findAll(): Course[]
}