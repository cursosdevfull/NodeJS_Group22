import { Request, Response } from "express";
import { UserService } from "../service";

export class UserController {
    //readonly service: UserService;

    constructor(readonly service: UserService) {
        //this.service = service;
    }

    async getUserList(req: Request, res: Response) {
        //const users = this.service.getList();
        //this.service.getList().then(users => res.status(200).json(users));
        //res.status(200).json(users);

        const users = await this.service.getList();
        const usersWithFullName = users.map(user => ({ id: user.id, fullname: `${user.name} ${user.lastname}` }));
        res.status(200).json(usersWithFullName);
    }
}