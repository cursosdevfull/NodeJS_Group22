import { User } from "@user";

export type AuthPort = {
    findByEmail(email: string): Promise<User | null>
    findByRefreshToken(refreshToken: string): Promise<User | null>
    updateUser(user: User): Promise<User>
};
