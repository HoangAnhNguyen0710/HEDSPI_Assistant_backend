/* eslint-disable prettier/prettier */
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id?:number;

   @CreateDateColumn({nullable:true})
   createdAt?: Date;

   @CreateDateColumn({nullable:true})
   updatedAt?: Date;
}