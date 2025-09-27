import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student";

@Entity({ name: "student_additional" })
export class StudentAdditionalEntity {
    @PrimaryGeneratedColumn()
    additionalId: number

    @Column({ type: "varchar", length: 100 })
    hobby: string

    @Column({ type: "varchar", length: 100 })
    favoriteSubject: string

    @OneToOne(() => StudentEntity, student => student.additionalInfo)
    @JoinColumn({ name: "student_id" })
    student: StudentEntity
}