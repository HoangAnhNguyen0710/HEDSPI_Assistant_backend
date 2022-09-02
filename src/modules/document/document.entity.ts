/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Comment } from "../comment/comment.entity";
import { Subject } from "../subject/subject.entity";
import { User } from "../user/user.entity";

@Entity('document')
export class Document extends BaseEntity{
   @Column({type: 'text', nullable:true})
   title:string;

   @Column({type: 'varchar', length: 100, nullable:false})
   program: string;

   @Column({type: 'varchar', length: 100, nullable:false})
   lecturer: string;

   @Column({type: 'int', nullable:false})
   semester:number;

   @Column({type: 'text', nullable:true})
   description:string;

   @Column({type: 'text', nullable:false})
   type:string;

   @Column({type: 'int', nullable:false, default: 0})
   likes:number;

   @Column({type: 'int', nullable:false, default: 0})
   views:number;

   @Column({type: 'int', nullable:false, default: 0})
   rating:number;

   @Column({type: 'int', nullable:false, default: 0})
   RatingNum:number;
 
   @OneToOne(() => Subject, (subject) => subject.document, { cascade: true })
   @JoinColumn()
   subject: Subject

   @ManyToOne(() => User, (user) => user.document, { cascade: true })
   author: User

   @OneToMany(() => Comment, (comment) => comment.document)
   comments: Comment[];
}

