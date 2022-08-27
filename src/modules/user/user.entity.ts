/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity, OneToOne } from "typeorm";
import { Document } from "../document/document.entity";
import { Question } from "../question/question.entity";
import { Review } from "../review/review.entity";

@Entity('user')
export class User extends BaseEntity{
   @Column({type: 'varchar', length: 100, nullable:false})
   email: string;

   @Column({type: 'varchar', length: 50, nullable:false})
   name: string;

   @Column({type: 'varchar', length: 100, nullable:false})
   username: string;

   @Column({type: 'text', nullable:false})
   password:string;

   @Column({type: 'int', nullable:false})
   schoolyear:number;

   @Column({type: 'text', nullable:true})
   avatar:string;

   @Column({type: 'text', nullable:false, default: "user"})
   role:string;

   @OneToOne(() => Document, (document) => document.author)
   document: Document;

   @OneToOne(() => Question, (question) => question.author)
   question: Question;

   @OneToOne(() => Review, (review) => review.author)
   review: Review;
}

