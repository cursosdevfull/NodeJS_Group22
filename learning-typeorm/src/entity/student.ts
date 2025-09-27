import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address";
import { StudentAdditionalEntity } from "./student-additional";

@Entity({ name: "student" })
export class StudentEntity {
    @PrimaryGeneratedColumn()
    studentId: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "int" })
    age: number;

    @Column({ type: "varchar", length: 100 })
    email: string;

    @OneToMany(() => AddressEntity, address => address.student)
    addresses: AddressEntity[];

    @OneToOne(() => StudentAdditionalEntity, additionalInfo => additionalInfo.student)
    additionalInfo: StudentAdditionalEntity;
}