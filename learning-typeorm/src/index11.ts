
import { dataSource } from "./data-source"
import { UserEntity } from "./entity/User"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const repository = dataSource.getRepository(UserEntity)

        const pageSize = 3
        const pageNumber = 2

        //const result = await repository.find({ take: 3, skip: 3, order: { name: "ASC" } })
        const [users, total] = await repository.findAndCount({ take: pageSize, skip: (pageNumber - 1) * pageSize, order: { name: "ASC" } })

        console.log("Loaded users: ", users)
        console.log("Total users: ", total)

    })
    .catch((error) => console.log(error))

