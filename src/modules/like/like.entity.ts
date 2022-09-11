/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Entity, ManyToOne } from "typeorm";
import { Document } from "../document/document.entity";
import { Question } from "../question/question.entity";
import { Review } from "../review/review.entity";
import { User } from "../user/user.entity";

@Entity('like')
export class Like extends BaseEntity{

   @ManyToOne(() => User, (user) => user.likes, { cascade: true })
   user: User

   @ManyToOne(() => Review, (review) => review.likes, { cascade: true })
   review: Review

   @ManyToOne(() => Question, (question) => question.likes, { cascade: true })
   question: Question

   @ManyToOne(() => Document, (document) => document.likes, { cascade: true })
   document: Document
}

