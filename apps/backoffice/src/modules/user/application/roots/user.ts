import { v4 as uuidv4, validate as uuidValidate } from "uuid"
import { Role } from "../components/role"

type UserEssentials = {
    name: string
    email: string
    password: string
    roles: Role[]
}

type UserOptionals = {
    userId: number
    isActive: boolean
    secret: string | null
    refreshToken: string
    createdAt: Date
    updatedAt: Date
}

export type UserProps = UserEssentials & Partial<UserOptionals>
export type UserUpdateProps = Partial<Omit<UserEssentials, "email"> & Omit<UserOptionals, "userId" | "isActive">>

export class User {
    private readonly userId!: number
    private name!: string
    private readonly email!: string
    private password!: string
    private isActive!: boolean
    private secret: string | undefined
    private refreshToken!: string
    private roles!: Role[]
    private createdAt!: Date
    private updatedAt: Date | undefined

    constructor(props: UserProps) {
        if (props.name.length < 3) throw new Error("Name must be at least 3 characters long");
        if (!/\S+@\S+\.\S+/.test(props.email)) throw new Error("Email is invalid");
        if (props.password.length < 6) throw new Error("Password must be at least 6 characters long");
        if (!props.roles || props.roles.length === 0) throw new Error("User must have at least one role");
        this.isActive = props.isActive ?? true;

        this.refreshToken = props.refreshToken ? props.refreshToken : uuidv4();

        Object.assign(this, props)
    }

    toJSON() {
        return {
            userId: this.userId,
            name: this.name,
            email: this.email,
            password: this.password,
            isActive: this.isActive,
            secret: this.secret,
            refreshToken: this.refreshToken,
            roles: this.roles,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    update(props: UserUpdateProps) {
        if (props.name && props.name.length < 3) throw new Error("Name must be at least 3 characters long");
        if (props.password && props.password.length < 6) throw new Error("Password must be at least 6 characters long");
        if (props.roles && props.roles.length === 0) throw new Error("User must have at least one role");
        if (props.refreshToken && !uuidValidate(props.refreshToken)) throw new Error("Refresh token is invalid");

        Object.assign(this, props)
    }

    delete() {
        this.isActive = false;
    }


}