import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly ReviewRepository: Repository<Review>,
  ) {}

  async findAllNum() {
    const All = await this.ReviewRepository.find();
    if (All !== null) return All.length;
  }

  async findperPage(page_num: number, num_per_page: number, res: Response) {
    const pagination = await this.ReviewRepository.find();
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
  //     const find = await this.ReviewRepository.findOne({
  //         where:{
  //             subject_code: subject_code,
  //         }
  //     });
  //     if(find != null){
  //         res.status(200).send(find);
  //     }
  //     else res.status(400).send("Môn học không tồn tại");
  // }
  async createQuestion(review: Review, req: Request, res: Response) {
    this.ReviewRepository.save(review);
    res.status(201).send(review);
  }
}
