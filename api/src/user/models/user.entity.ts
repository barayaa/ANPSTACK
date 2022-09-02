import { BlogEntryEntity } from "src/blog/model/blog_entry_entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



export enum UserRole{
   ADMIN = 'admin',
   EDITOR = 'editor',
   USER = 'user'
}
@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
     username: string;
     
     @Column({unique: true})
     email: string;

     @Column({
      select: false
     })
     password: string;

     @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER
     })
     role: UserRole

     @Column({
      nullable: true
     })
     profileImage: string;

     @OneToMany( () => BlogEntryEntity, blogEntryEntity => blogEntryEntity.author)
     blogEntries: BlogEntryEntity[]

     @BeforeInsert()
     emailToLowerCase(){
        this.email = this.email.toLowerCase();
     }

}