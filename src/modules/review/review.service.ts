/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Review } from './review.entity';


@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review, User)
    private readonly ReviewRepository: Repository<Review>,
    private readonly UserRepository: Repository<User>,
  ) {}

  async findAllNum(type) {
    let All = null;
        if(type !== "all"){
            All = await this.ReviewRepository.find({
                where:{ 
                    type: type, 
                }
            });
        }
        else All = await this.ReviewRepository.find(
          {
            order:{
              createdAt: "DESC",
            }
          }
        );

        if(All !== null)
        return All.length;
  }

  async findperPage(type: string, page_num: number, num_per_page: number, res: Response) {
    let pagination = null;
        if(type === "all"){
            pagination = await this.ReviewRepository.find({relations: {
                author: true,
                comments: true, 
                likes: true
            },
            order:{
              createdAt: "DESC",
            }
          });
        }
        else {
            pagination = await this.ReviewRepository.find({
                where:{ 
                    type: type, 
                },
                relations: {
                    author: true,
                    comments: true,
                    likes: true
                },
            });
        }
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

  async getAllComments(id: number, req: Request, res: Response) {
      const find = await this.ReviewRepository.find({
          where:{
              id: id,
          },
          relations:{
            author: true,
            comments:{
              user: true
            }
          }
      });
      if(find != null){
          res.status(200).send(find[0].comments);
      }
      else res.status(400).send("Review không tồn tại");
  }

  async getAllLikes(id: number, req: Request, res: Response) {
    const find = await this.ReviewRepository.find({
        where:{
            id: id,
        },
        relations:{
          author: true,
          likes:{
            user: true
          }
        }
   
    });
    if(find != null){
        res.status(200).send(find[0].comments);
    }
    else res.status(400).send("Review không tồn tại");
}
  
  async createReview(review: Review, req: Request, res: Response) {
    const user = await this.UserRepository.findOneBy({id: review.author.id});
    if(user){
      const saving = await this.ReviewRepository.save(review);
      user.review = [saving, ...user.review];
      await this.UserRepository.save(user);
      console.log(saving)
      res.status(201).send(saving);
    }
    else res.status(400);
  }
}
