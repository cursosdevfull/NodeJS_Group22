import { dataSource } from "./data-sources/data-source-many-many"
import { RoleEntity } from "./entity/many-to-many/role"
import { UserEntity } from "./entity/many-to-many/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const userRepository = dataSource.getRepository(UserEntity)
        const roleRepository = dataSource.getRepository(RoleEntity)

        const roles = [{ id: 1 }, { id: 2 }, { id: 3 }]

        const user = new UserEntity()
        user.name = "carlos lopez"
        user.email = "carlos@example.com"
        user.password = "securepassword"
        user.roles = roles.map(role => role as RoleEntity)

        await userRepository.save(user)
        console.log("User has been saved!")

    })
    .catch((error) => console.log(error))

