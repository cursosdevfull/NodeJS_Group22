import { MoreThan, MoreThanOrEqual, Not } from "typeorm";
import { dataSource } from "./data-source";
import { UserEntity } from "./entity/User";

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const repository = dataSource.getRepository(UserEntity)

        const users = await repository.find()
        console.log("Loaded users: ", users)

        const userById = await repository.findOne({ where: { id: 2 } })
        console.log("User by id: ", userById)

        const usersFilter01 = await repository.find({ where: { id: MoreThanOrEqual(2) } })
        console.log("User filter01: ", usersFilter01)

        const usersFilter02 = await repository.find({ where: { id: Not(2) } })
        console.log("User filter02: ", usersFilter02)

    })
    .catch((error) => console.log(error))

