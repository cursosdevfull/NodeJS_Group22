import { Auth, AuthPort } from "@auth";
import { Database } from "@bootstrap";
import { Token } from "@core";
import { User, UserEntity } from "@user";
import { UserDto } from "modules/user/adapters/dtos/user.dto";


export class AuthAdapter implements AuthPort {
    async login(auth: Auth): Promise<{ accessToken: string; refreshToken: string; } | null> {
        const repository = Database.dataSource.getRepository(UserEntity)
        const user = await repository.findOne({ where: { email: auth.toJSON().email }, relations: ["roles"] })

        if (!user) return null;

        const accessToken = Token.generateAccessToken(user.name, user.email, user.roles)

        return { accessToken, refreshToken: user.refreshToken }
    }

    async findByEmail(email: string): Promise<User | null> {
        const repository = Database.dataSource.getRepository(UserEntity)
        const user = await repository.findOne({ where: { email, isActive: true }, relations: ["roles"] })

        return user ? UserDto.fromDataToDomain(user) as User : null
    }

    async findByRefreshToken(refreshToken: string): Promise<User | null> {
        const repository = Database.dataSource.getRepository(UserEntity)
        const user = await repository.findOne({ where: { refreshToken, isActive: true }, relations: ["roles"] })

        return user ? UserDto.fromDataToDomain(user) as User : null
    }

    async updateUser(user: User): Promise<User> {
        const repository = Database.dataSource.getRepository(UserEntity)
        const userEntity = UserDto.fromDomainToData(user)
        await repository.save(userEntity as UserEntity)
        return UserDto.fromDataToDomain(userEntity) as User
    }

}