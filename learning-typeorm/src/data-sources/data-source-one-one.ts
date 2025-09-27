import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "../entity/one-to-one/user"
import { RoleEntity } from "../entity/one-to-one/role"

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "user",
    password: "12345",
    database: "db",
    synchronize: true,
    logging: false,
    entities: [UserEntity, RoleEntity]
})
