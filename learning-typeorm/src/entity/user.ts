import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "int", default: 0 })
    age: number

    @Column({ type: "varchar", length: 100, unique: true })
    email: string

    @Column({ type: "varchar", length: 50 })
    password: string
}