import { EntityBase } from "@core";
import { UserEntity } from "@user";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role" })
export class RoleEntity extends EntityBase {
    @PrimaryGeneratedColumn()
    roleId!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    name!: string;

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users!: UserEntity[];
}