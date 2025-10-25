import { RoleEntity } from "@role";
import { User, UserProps } from "../../application/roots/user";
import { UserEntity } from "../entities/user.entity";

export class UserDto {
    static fromDomainToData(domain: User | User[]): UserEntity | UserEntity[] {
        if (Array.isArray(domain)) {
            return domain.map(user => this.fromDomainToData(user) as UserEntity);
        }

        const props = domain.toJSON();

        const userEntity = new UserEntity();
        userEntity.userId = props.userId;
        userEntity.name = props.name;
        userEntity.email = props.email;
        userEntity.password = props.password;
        userEntity.isActive = props.isActive;
        userEntity.secret = props.secret ?? "";
        userEntity.refreshToken = props.refreshToken;
        userEntity.roles = props.roles as RoleEntity[];
        userEntity.createdAt = props.createdAt;
        if (props.updatedAt) userEntity.updatedAt = props.updatedAt;
        return userEntity;
    }

    static fromDataToDomain(entity: UserEntity | UserEntity[]): User | User[] {
        if (Array.isArray(entity)) {
            return entity.map(user => this.fromDataToDomain(user) as User);
        }

        const props: UserProps = {
            userId: entity.userId,
            name: entity.name,
            email: entity.email,
            password: entity.password,
            isActive: entity.isActive,
            secret: entity.secret,
            refreshToken: entity.refreshToken,
            roles: entity.roles,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }

        console.log(props)

        return new User(props);
    }
}