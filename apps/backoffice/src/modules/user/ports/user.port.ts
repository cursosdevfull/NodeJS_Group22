import { ResultsPage } from "@core"
import { User } from "../application/roots/user"

export type UserPort = {
    save(user: User): Promise<User>
    findById(userId: number): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    getAll(): Promise<User[]>
    getByPage(page: number, limit: number): Promise<ResultsPage<User>>
}