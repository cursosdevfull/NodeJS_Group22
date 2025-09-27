import { dataSource } from "./data-sources/data-source-many-many"
import { RoleEntity } from "./entity/many-to-many/role"
import { UserEntity } from "./entity/many-to-many/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const userRepository = dataSource.getRepository(UserEntity)

        const users = await userRepository.find({ relations: { roles: true } })
        console.log("Loaded users: ", users)

    })
    .catch((error) => console.log(error))

