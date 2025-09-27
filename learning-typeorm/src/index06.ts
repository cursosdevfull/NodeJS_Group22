import { dataSource } from "./data-sources/data-source-one-one"
import { RoleEntity } from "./entity/one-to-one/role"
import { UserEntity } from "./entity/one-to-one/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const userRepository = dataSource.getRepository(UserEntity)
        const roleRepository = dataSource.getRepository(RoleEntity)

        const roleAdmin = { id: 2 }

        const user = new UserEntity()
        user.name = "carlos lopez"
        user.email = "carlos@example.com"
        user.password = "securepassword"
        user.role = roleAdmin as RoleEntity

        await userRepository.save(user)
        console.log("User has been saved!")

    })
    .catch((error) => console.log(error))

