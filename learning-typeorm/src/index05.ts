import { dataSource } from "./data-sources/data-source-one-many"
import { RoleEntity } from "./entity/one-to-many/role"
import { UserEntity } from "./entity/one-to-many/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const userRepository = dataSource.getRepository(UserEntity)
        const roleRepository = dataSource.getRepository(RoleEntity)

        const roleAdmin = await roleRepository.findOne({ where: { name: "admin" } })

        /*         const user = new UserEntity()
                user.name = "David Gonzalez"
                user.email = "david@example.com"
                user.password = "securepassword"
                user.role = roleAdmin
        
                await userRepository.save(user)
                console.log("User has been saved!") */

        const users = await userRepository.find({ relations: { role: true }, select: { id: true, name: true, email: true, role: { name: true } } })
        console.log("All users from the db: ", users)
    })
    .catch((error) => console.log(error))

