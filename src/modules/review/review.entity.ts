/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/abstract.type";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Comment } from "../comment/comment.entity";
import { Like } from "../like/like.entity";
import { User } from "../user/user.entity";

@Entity('review')
export class Review extends BaseEntity{
    @Column({type: 'text', nullable:true})
    title:string;
 
    @Column('text', {array: true})
    topic:   string[];
 
    @Column({type: 'text', nullable:true})
    description:string;
 
    @Column({type: 'text', nullable:true})
    type:string;
 
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

    @OneToMany(() => Comment, (comment) => comment.review, {cascade: true})
    comments?: Comment[];

    @OneToMany(() => Like, (like) => like.review)
    likes?: Like[];
}

