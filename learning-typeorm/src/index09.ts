import { dataSource } from "./data-sources/data-source-many-many-active"
import { UserEntity } from "./entity/many-to-many-active/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const result = await UserEntity.find()

        console.log("Loaded users: ", result)

    })
    .catch((error) => console.log(error))

