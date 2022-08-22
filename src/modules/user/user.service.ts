/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>
    ){}

    findAll(): Observable<User[]>{
        return from(this.UserRepository.find());
    }
    // findOneById(id: number, req: Request, res: Response): Promise<User> {
    async findOneById(id: number, req: Request, res: Response) {
        const find = await this.UserRepository.findOneBy({ id: id });
        if(find != null){
            res.status(200).send(find);
        }
        else res.status(400).send("User không tồn tại");
    }
    
    async createUser(user: User, req: Request, res: Response){
        const checker = await this.UserRepository.findOne({
            where:{
                email: user.email,
            }
        })
        if(checker === null){
            this.UserRepository.save(user);
            res.status(201).send(user);
        }
        else {
            res.status(400).send("user đã tồn tại");

        };
    }
}
