/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity } from "typeorm";
// title: "",
// subject_code: "",
// subject_name: "",
// program: "",
// author: "Nguyen Hoang Anh",
// lecturer: "",
// description: "",
// semester: 1,
// type: "",
// likes: 0,
// views: 0,
// rating: 0,
@Entity('document')
export class Document extends BaseEntity{
   @Column({type: 'text', nullable:true})
   title:string;

   @Column({type: 'varchar', length: 100, nullable:false})
   subject_code: string;

   @Column({type: 'varchar', length: 100, nullable:false})
   subject_name: string;

   @Column({type: 'varchar', length: 100, nullable:false})
   program: string;

   @Column({type: 'varchar', length: 50, nullable:false})
   author: string;

   @Column({type: 'varchar', length: 100, nullable:false})
   lecturer: string;

   @Column({type: 'int', nullable:false})
   semester:number;

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
}

