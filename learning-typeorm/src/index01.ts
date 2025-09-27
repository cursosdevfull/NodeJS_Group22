import { dataSource } from "./data-source";
import { UserEntity } from "./entity/User";

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const repository = dataSource.getRepository(UserEntity)

        const user01 = new UserEntity()
        user01.name = "Smith Doe"
        user01.email = "smith.doe@example.com"
        user01.password = "securepassword"

        const user02 = new UserEntity()
        user02.name = "Jane Doe"
        user02.email = "jane.doe@example.com"
        user02.password = "securepassword"

        const result01 = await repository.save(user01)
        const result02 = await repository.save(user02)
        console.log("User has been saved:", result01)
        console.log("User has been saved:", result02)

    })
    .catch((error) => console.log(error))