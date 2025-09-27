
import { dataSource } from "./data-source"
import { StudentEntity } from "./entity/student"


dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder(StudentEntity, "student")
            .select(["student.studentId", "student.name", "student.age", "address.street", "address.city", "address.state"])
            .where("student.age > :age", { age: 20 })
            .andWhere("address.city = :city", { city: "Lima" })
            .innerJoin("student.addresses", "address")
            .getRawMany()

        console.log(results)

    })
    .catch((error) => console.log(error))

