/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Comment } from "../comment/comment.entity";
import { User } from "../user/user.entity";

@Entity('question')
export class Question extends BaseEntity{
   @Column({type: 'text', nullable:true})
   title:string;

   @Column('text', {array: true})
   topic:   string[];

   @Column({type: 'text', nullable:true})
   description:string;

   @Column({type: 'text', nullable:true})
   type:string;

   @Column({type: 'int', nullable:false, default: 0})
   likes:number;

   @Column({type: 'int', nullable:false, default: 0})
   views:number;

   @Column({type: 'int', nullable:false, default: 0})
   rating:number;

   @Column({type: 'int', nullable:false, default: 0})
   RatingNum:number;

   @Column({type: 'int', nullable:false, default: 0})
   CommentNum:number;

   @ManyToOne(() => User, (user) => user.question)
   author: User;

   @OneToMany(() => Comment, (comment) => comment.question)
   comments: Comment[];
}

