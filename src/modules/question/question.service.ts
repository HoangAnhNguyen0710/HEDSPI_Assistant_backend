/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly QuestionRepository: Repository<Question>,
  ) {}

  // findAll(): Observable<Question[]>{
  //     return from(this.QuestionRepository.find());
  // }
  async findAllNum() {
    const All = await this.QuestionRepository.find();
    if (All !== null) return All.length;
  }

  async findperPage(page_num: number, num_per_page: number, res: Response) {
    const pagination = await this.QuestionRepository.find();
    if (pagination !== null) {
      if (page_num * num_per_page > pagination.length) {
        const List = pagination.slice(
          (page_num - 1) * num_per_page,
          pagination.length,
        );
        res.status(200).send(List);
      } else {
        const List = pagination.slice(
          (page_num - 1) * num_per_page,
          page_num * num_per_page,
        );
        res.status(200).send(List);
      }
    } else res.status(400);
  }
  // findOneById(id: number, req: Request, res: Response): Promise<User> {
  // async findOne(subject_code: string, req: Request, res: Response) {
  //     const find = await this.QuestionRepository.findOne({
  //         where:{
  //             subject_code: subject_code,
  //         }
  //     });
  //     if(find != null){
  //         res.status(200).send(find);
  //     }
  //     else res.status(400).send("Môn học không tồn tại");
  // }
  async createQuestion(question: Question, req: Request, res: Response) {
    this.QuestionRepository.save(question);
    res.status(201).send(question);
  }
}
