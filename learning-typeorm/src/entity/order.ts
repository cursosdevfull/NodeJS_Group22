import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("order")
export class OrderEntity {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ type: "int" })
    customerId: number;

    @Column({ type: "varchar", length: 100 })
    product: string;

    @Column({ type: "int" })
    quantity: number;

    @Column({ type: "float" })
    price: number;
}