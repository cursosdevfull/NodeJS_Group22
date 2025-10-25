import { EntityBase } from "@core";
import { RoleEntity } from "@role";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity extends EntityBase {
    @PrimaryGeneratedColumn()
    userId!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 150 })
    password!: string;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @Column({ type: "varchar", length: 100, nullable: true })
    secret!: string;

    @Column({ type: "varchar", length: 50 })
    refreshToken!: string;

    @ManyToMany(() => RoleEntity, (role) => role.users)
    @JoinTable({
        name: "user_role",
        joinColumn: { name: "userId", referencedColumnName: "userId" },
        inverseJoinColumn: { name: "roleId", referencedColumnName: "roleId" },
    })
    roles!: RoleEntity[];
}