import { UserDto } from "../adapters/dtos/user.dto";
import { UserPort } from "../ports/user.port";
import { User } from "./roots/user";

export class UserApplication {
    constructor(private port: UserPort) { }

    async create(user: User) {
        const userFound = await this.port.findByEmail(user.toJSON().email);

        if (userFound) {
            throw new Error("Email already in use");
        }

        return this.port.save(user);
    }

    async update(user: User) {
        return this.port.save(user);
    }

    async getById(userId: number) {
        const userFound = await this.port.findById(userId);
        if (!userFound) {
            throw new Error("User not found");
        }
        return userFound;
    }

    async getAll() {
        return this.port.getAll();
    }

    async getByPage(page: number, limit: number) {
        return this.port.getByPage(page, limit);
    }
}