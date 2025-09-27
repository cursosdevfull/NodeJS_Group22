

import { dataSource } from "./data-source"
import { OrderEntity } from "./entity/order"
import { StudentEntity } from "./entity/student"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .createQueryBuilder()
            .select("customerId, sum(order.price * order.quantity)", "total")
            .from(OrderEntity, "order")
            .where("order.product = :product", { product: "Product01" })
            .groupBy("customerId")
            .having("total > :total", { total: 100 })
            .getRawMany()

        console.log(results)

    })
    .catch((error) => console.log(error))
