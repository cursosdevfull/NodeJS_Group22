import { dataSource } from "./data-source"
import { OrderEntity } from "./entity/order"
import { StudentEntity } from "./entity/student"
import { UserEntity } from "./entity/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder()
            .from(UserEntity, "user")
            .orderBy("user.age", "DESC")
            .limit(3)  // take
            .offset(2) // skip
            .getRawMany()

        console.log(results)

    })
    .catch((error) => console.log(error))