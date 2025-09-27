import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./entity/user"
import { RoleEntity } from "./entity/role"
import { StudentEntity } from "./entity/student"
import { AddressEntity } from "./entity/address"
import { OrderEntity } from "./entity/order"
import { StudentAdditionalEntity } from './entity/student-additional';

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "user",
    password: "12345",
    database: "db",
    synchronize: true,
    logging: true,
    entities: [UserEntity, RoleEntity, StudentEntity, AddressEntity, OrderEntity, StudentAdditionalEntity]
})
