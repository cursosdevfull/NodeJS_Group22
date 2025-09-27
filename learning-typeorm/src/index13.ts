
import { dataSource } from "./data-source"
import { UserEntity } from "./entity/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const repository = dataSource.getRepository(UserEntity)
        const users = await repository.find()

        const manager = dataSource.manager
        const allUsers = await manager.find(UserEntity)

        const results = await manager
            .createQueryBuilder()
            .from(UserEntity, "usuario")
            //.where("usuario.id >= :id and usuario.email = :email", { id: 10, email: "carlos@example.com" })
            .where("usuario.id = :id", { id: 10 })
            .andWhere("usuario.email = :email", { email: "carlos@example.com" })
            .getRawMany()

        console.log("All users from repository: ", users)
        console.log("All users from manager: ", allUsers)
        console.log("User with id 10: ", results)

    })
    .catch((error) => console.log(error))

