import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "role" })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}