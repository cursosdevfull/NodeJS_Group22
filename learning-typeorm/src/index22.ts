

import { dataSource } from "./data-source"
import { StudentEntity } from "./entity/student"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder()
            .select("distinct student.age", "age")
            .from(StudentEntity, "student")
            .getRawMany()

        console.log(results)

    })
    .catch((error) => console.log(error))

