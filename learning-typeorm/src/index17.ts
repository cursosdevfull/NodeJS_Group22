
import { dataSource } from "./data-source"
import { StudentEntity } from "./entity/student"


dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder(StudentEntity, "student")
            .select(["student.studentId", "student.name", "address.street", "address.city", "address.state"])
            .innerJoin("student.addresses", "address")
            .getSql()
        //.getRawMany()

        console.log(results)

    })
    .catch((error) => console.log(error))

