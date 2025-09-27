import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { RoleEntity } from "./role"

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "varchar", length: 100, unique: true })
    email: string

    @Column({ type: "varchar", length: 50 })
    password: string

    @OneToOne(() => RoleEntity, role => role.user)
    @JoinColumn({ name: "role" })
    role: RoleEntity;
}