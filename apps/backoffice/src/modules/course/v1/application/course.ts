export class Course {
    private readonly courseId: number;
    private title: string;
    private readonly createdAt: Date;
    private updatedAt?: Date;
    private deletedAt?: Date;

    constructor(title: string) {
        this.title = title;
        this.courseId = Math.floor(Math.random() * 10000);
        this.createdAt = new Date();

        if (this.title.length < 10) {
            throw new Error("Title must be at least 10 characters long");
        }
    }

    update(newTitle: string) {
        if (newTitle.length < 10) {
            throw new Error("Title must be at least 10 characters long");
        }
        this.title = newTitle;
        this.updatedAt = new Date();
    }

    delete() {
        this.deletedAt = new Date();
    }

    properties() {
        return { title: this.title, courseId: this.courseId }
    }
}