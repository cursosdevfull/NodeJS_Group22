
import { dataSource } from "./data-source"
import { UserEntity } from "./entity/User"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const repository = dataSource.getRepository(UserEntity)

        const result = await repository.find({ order: { name: "ASC", email: "DESC" } })

        console.log("Loaded users: ", result)

    })
    .catch((error) => console.log(error))

