/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity, OneToOne } from "typeorm";
import { Document } from "../document/document.entity";

@Entity('subject')
export class Subject extends BaseEntity{
   @Column({type: 'varchar', length: 100, nullable:false})
   subject_code: string;

   @Column({type: 'varchar', length: 100, nullable:false})
   type: string;

   @Column({type: 'varchar', length: 100, nullable:false})
   name: string;

   @Column({type: 'varchar', length: 50, nullable:false})
   program: string;

   @Column({type: 'int', nullable:false})
   semester:number;

   @Column({type: 'text', nullable:true})
   note:string;

   @OneToOne((type) => Document, (document) => document.subject)
   document: Document;
}

