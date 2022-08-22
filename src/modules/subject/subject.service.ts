/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private readonly SubjectRepository: Repository<Subject>
    ){}

    findAll(): Observable<Subject[]>{
        return from(this.SubjectRepository.find());
    }
    // findOneById(id: number, req: Request, res: Response): Promise<User> {
    async findOne(subject_code: string, req: Request, res: Response) {
        const find = await this.SubjectRepository.findOne({
            where:{ 
                subject_code: subject_code, 
            }
        });
        if(find != null){
            res.status(200).send(find);
        }
        else res.status(400).send("Môn học không tồn tại");
    }
}
