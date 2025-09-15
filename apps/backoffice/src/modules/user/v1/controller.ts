import { Request, Response } from "express";
import { UserService } from "../service";
import { UserCreateValidator } from "./validators/user-create";
import { validate } from "class-validator";

export class UserController {

    constructor(readonly service: UserService) {
    }

    async getUserList(req: Request, res: Response) {
        const users = await this.service.getList();
        res.status(200).json(users);
    }

    async createUser(req: Request, res: Response) {
        /*         const userValidator = new UserCreateValidator();
                userValidator.name = req.body.name;
                userValidator.lastname = req.body.lastname;
        
                const errors = await validate(userValidator);
                if (errors.length > 0) {
                    return res.status(411).json({ errors });
                } */

        const { name, lastname } = req.body;
        //const user = await this.service.create({ name, lastname });
        res.status(201).json({ name, lastname });
    }
}