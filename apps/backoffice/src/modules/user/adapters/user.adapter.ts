import { Database } from "@bootstrap";
import { User } from "../application/roots/user";
import { UserPort } from "../ports/user.port";
import { UserEntity } from "./entities/user.entity";
import { UserDto } from "./dtos/user.dto";
import { ResultsPage } from "@core";

export class UserAdapter implements UserPort {
    async save(user: User): Promise<User> {
        try {
            const repository = Database.dataSource.getRepository(UserEntity);
            const entity = UserDto.fromDomainToData(user) as UserEntity;

            const savedUser = await repository.save(entity);
            return UserDto.fromDataToDomain(savedUser) as User;
        } catch (error) {
            console.log("Error saving user:", error);
            throw new Error("Error saving user");
        }
    }

    async findById(userId: number): Promise<User | null> {
        try {
            const repository = Database.dataSource.getRepository(UserEntity);
            const userFound = await repository.findOne({ where: { userId, isActive: true }, relations: ["roles"] });

            return userFound ? UserDto.fromDataToDomain(userFound) as User : null;
        } catch (error) {
            console.log("Error finding user by ID:", error);
            throw new Error("Error finding user by ID");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const repository = Database.dataSource.getRepository(UserEntity);
            const userFound = await repository.findOneBy({ email, isActive: true });
            return userFound ? UserDto.fromDataToDomain(userFound) as User : null;
        } catch (error) {
            console.log("Error finding user by email:", error);
            throw new Error("Error finding user by email");
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const repository = Database.dataSource.getRepository(UserEntity);
            const users = await repository.find({ where: { isActive: true }, relations: ["roles"] });
            return UserDto.fromDataToDomain(users) as User[];
        } catch (error) {
            console.log("Error getting all users:", error);
            throw new Error("Error getting all users");
        }
    }

    async getByPage(page: number, limit: number): Promise<ResultsPage<User>> {
        try {
            const repository = Database.dataSource.getRepository(UserEntity);
            const [users, total] = await repository.findAndCount({ skip: (page - 1) * limit, take: limit, where: { isActive: true }, relations: ["roles"] });
            return { data: UserDto.fromDataToDomain(users) as User[], total };
        } catch (error) {
            console.log("Error getting users by page:", error);
            throw new Error("Error getting users by page");
        }
    }

}