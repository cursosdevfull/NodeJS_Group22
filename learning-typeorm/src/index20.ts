import { dataSource } from "./data-source"
import { StudentEntity } from "./entity/student"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder()
            .select("sum(student.age)", "total")
            .addSelect("avg(student.age)", "average")
            .from(StudentEntity, "student")
            .getRawOne()

        console.log(results)

    })
    .catch((error) => console.log(error))

