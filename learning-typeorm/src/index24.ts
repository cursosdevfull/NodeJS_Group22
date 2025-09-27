import { dataSource } from "./data-source"
import { OrderEntity } from "./entity/order"
import { StudentEntity } from "./entity/student"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder()
            .select("customerId, product, sum(order.price * order.quantity)", "subtotal")
            .from(OrderEntity, "order")
            .orderBy("product", "ASC")
            .addOrderBy("subtotal", "DESC")
            .groupBy("customerId, product")
            .getRawMany()

        console.log(results)

    })
    .catch((error) => console.log(error))