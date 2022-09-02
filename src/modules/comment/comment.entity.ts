/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Document } from "../document/document.entity";
import { Question } from "../question/question.entity";
import { Review } from "../review/review.entity";
import { User } from "../user/user.entity";

@Entity('comment')
export class Comment extends BaseEntity{
   @Column({type: 'text', nullable:true})
   content:string

   @ManyToOne(() => User, (user) => user.comments, { cascade: true })
   user: User

   @ManyToOne(() => Review, (review) => review.comments)
   review: Review

   @ManyToOne(() => Question, (question) => question.comments)
   question: Question

   @ManyToOne(() => Document, (document) => document.comments)
   document: Document
}

