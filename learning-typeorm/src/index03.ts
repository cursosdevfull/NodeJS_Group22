import { Between, MoreThan, MoreThanOrEqual, Not } from "typeorm";
import { dataSource } from "./data-source";
import { UserEntity } from "./entity/User";

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const repository = dataSource.getRepository(UserEntity)

        const usersFilter01 = await repository.find({ where: { id: Between(1, 2) } })
        console.log("User filter01: ", usersFilter01)

    })
    .catch((error) => console.log(error))

