import { Organization } from "../../../modules/organization/entities/organization.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    Id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({nullable:false})
    phone: string;

    @ManyToMany(()=>Organization, (organization)=>organization.user)
    @JoinTable()
    organization: Organization[];

}
