import { Between, MoreThan, MoreThanOrEqual, Not } from "typeorm";
import { dataSource } from "./data-source";
import { UserEntity } from "./entity/User";
import { RoleEntity } from "./entity/role";

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const userRepository = dataSource.getRepository(UserEntity)
        const roleRepository = dataSource.getRepository(RoleEntity)

        const role = new RoleEntity()
        role.name = 'security'

        const result = await roleRepository.save(role)
        console.log(result)

    })
    .catch((error) => console.log(error))

