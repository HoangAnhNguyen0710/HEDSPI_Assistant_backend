/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity, OneToMany } from "typeorm";
import { Comment } from "../comment/comment.entity";
import { Document } from "../document/document.entity";
import { Question } from "../question/question.entity";
import { Review } from "../review/review.entity";

@Entity('user')
export class User extends BaseEntity{
   @Column({type: 'varchar', length: 100, nullable:false})
   email: string;

   @Column({type: 'varchar', length: 50, nullable:false})
   name: string;

   @Column({type: 'int', nullable:true})
   schoolyear:number;

   @Column({type: 'text', nullable:true})
   picture:string;

   @Column({type: 'text', nullable:false, default: "user"})
   role:string;

   @OneToMany(() => Document, (document) => document.author)
   document: Document[];

   @OneToMany(() => Question, (question) => question.author)
   question: Question[];

   @OneToMany(() => Review, (review) => review.author)
   review: Review[];

   @OneToMany(() => Comment, (comment) => comment.user)
   comments: Comment[];
}

