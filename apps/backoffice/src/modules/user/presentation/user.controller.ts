import { Request, Response } from "express";
import { UserApplication } from "../application/user.application";
import { User, UserProps } from "../application/roots/user";
import { Encrypt } from "core/utils/encrypt";
import { Redis } from "@bootstrap";

export class UserController {
    constructor(private readonly application: UserApplication) { }

    async createUser(request: Request, response: Response) {
        try {
            const { name, email, password, roles } = request.body;
            const props: UserProps = { name, email, password: await Encrypt.hashPassword(password), roles };
            const user = new User(props);

            await this.application.create(user);

            return response.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error("Error in createUser:", error); // Log the error for debugging
            return response.status(400).json({ error: (error as Error).message });
        }
    }

    async updateUser(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            let { name, password, roles } = request.body;

            if (password) {
                password = await Encrypt.hashPassword(password);
            }

            const userFound = await this.application.getById(Number(userId));
            if (!userFound) {
                return response.status(404).json({ error: "User not found" });
            }

            userFound.update({ name, password, roles });

            await this.application.update(userFound);

            return response.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            console.error("Error in updateUser:", error); // Log the error for debugging
            return response.status(400).json({ error: (error as Error).message });
        }
    }

    async deleteUser(request: Request, response: Response) {
        try {
            const { userId } = request.params;

            const userFound = await this.application.getById(Number(userId));
            if (!userFound) {
                return response.status(404).json({ error: "User not found" });
            }

            userFound.delete();

            await this.application.update(userFound);
            return response.status(204).send();
        } catch (error) {
            console.error("Error in deleteUser:", error); // Log the error for debugging
            return response.status(400).json({ error: (error as Error).message });
        }
    }

    async getUserById(request: Request, response: Response) {
        try {
            const { userId } = request.params;

            const userFound = await this.application.getById(Number(userId));
            if (!userFound) {
                return response.status(404).json({ error: "User not found" });
            }

            await Redis.set(response.locals.cacheKey, JSON.stringify(userFound));

            return response.status(200).json(userFound);
        } catch (error) {
            console.error("Error in getUserById:", error); // Log the error for debugging
            return response.status(400).json({ error: (error as Error).message });
        }
    }

    async getAllUsers(request: Request, response: Response) {
        try {
            const users = await this.application.getAll();

            await Redis.set(response.locals.cacheKey, JSON.stringify(users));

            return response.status(200).json(users);
        } catch (error) {
            console.error("Error in getAllUsers:", error); // Log the error for debugging

            return response.status(400).json({ error: (error as Error).message });
        }
    }

    async getUsersByPage(request: Request, response: Response) {
        try {
            const { page, limit } = request.query;
            const { data, total } = await this.application.getByPage(Number(page), Number(limit));

            await Redis.set(response.locals.cacheKey, JSON.stringify({ data, total, page, pageSize: limit }));

            return response.status(200).json({ data, total, page, pageSize: limit });
        } catch (error) {
            console.error("Error in getUsersByPage:", error); // Log the error for debugging
            return response.status(400).json({ error: (error as Error).message });
        }
    }

}