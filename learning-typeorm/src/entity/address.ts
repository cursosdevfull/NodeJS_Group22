import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student";

@Entity({ name: "address" })
export class AddressEntity {
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column({ type: "varchar", length: 200 })
    street: string;

    @Column({ type: "varchar", length: 100 })
    city: string;

    @Column({ type: "varchar", length: 100 })
    state: string;

    @Column({ type: "varchar", length: 20 })
    zipCode: string;

    @ManyToOne(() => StudentEntity, student => student.addresses)
    student: StudentEntity;
}