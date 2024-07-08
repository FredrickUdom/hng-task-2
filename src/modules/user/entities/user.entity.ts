import { Organization } from "../../../modules/organization/entities/organization.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
    @JoinTable({
        name: 'user_organization',
        joinColumn: {
          name: 'userId',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'organizationId',
          referencedColumnName: 'id',
        },
      })
    organization: Organization[];

}
