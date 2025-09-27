
import { dataSource } from "./data-source"
import { StudentEntity } from "./entity/student"


dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder()
            .update(StudentEntity)
            .set({ name: "Pedro" })
            .where("studentId = :id", { id: 1 })
            .execute()

        console.log(results)

    })
    .catch((error) => console.log(error))

