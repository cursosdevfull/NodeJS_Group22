import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
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

    @ManyToOne(() => RoleEntity, role => role.users)
    @JoinColumn({ name: "role" })
    role: RoleEntity;
}