/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity } from "typeorm";
// title: "",
// topic: [],
// author: "Nguyen Hoang Anh",
// description: "",
// type: "",
// likes: 0,
// views: 0,
// rating: 0,
@Entity('question')
export class Question extends BaseEntity{
   @Column({type: 'text', nullable:true})
   title:string;

   @Column('text', {array: true})
   topic:   string[];

   @Column({type: 'varchar', length: 50, nullable:false})
   author: string;

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
}

