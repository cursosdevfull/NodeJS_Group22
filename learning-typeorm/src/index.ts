import { dataSource } from "./data-source"
import { AddressEntity } from "./entity/address";
import { OrderEntity } from "./entity/order"
import { StudentEntity } from './entity/student';
import { UserEntity } from "./entity/user"

dataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        const manager = dataSource.manager

        const results = await manager
            .query("call studentsByAge(?)", [30])

        console.log(results)

    })
    .catch((error) => console.log(error))    