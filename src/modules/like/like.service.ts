import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly LikeRepository: Repository<Like>,
  ) {}

  async createLike(
    like_author,
    like_article,
    like_article_type: string,
    req: Request,
    res: Response,
  ) {
    const check = await this.LikeRepository.findOne({
      where: {
        user: like_author,
        [like_article_type]: like_article,
      },
      relations: {
        user: true,
        review: true,
        document: true,
        question: true,
      },
    });
    if (check === null) {
      const doneLike = await this.LikeRepository.insert({
        user: like_author,
        [like_article_type]: like_article,
      });
      res.status(201).send(doneLike);
    } else res.status(200).send('Đã liked rồi');
  }

  async deleteLike(id: number, req: Request, res: Response) {
    const deleteLike = await this.LikeRepository.delete({ id: id });
    res.status(201).send('deleted');
  }

  async checkLikeOrNot(
    like_author_id: number,
    like_article_id: number,
    like_article_type: string,
    req: Request,
    res: Response,
  ) {
    const check = await this.LikeRepository.findOne({
      where: {
        user: {
          id: like_author_id,
        },
        [like_article_type]: {
          id: like_article_id,
        },
      },
      relations: {
        user: true,
        review: true,
        document: true,
        question: true,
      },
    });
    if (check !== null) {
      res.status(200).send(check);
    } else res.status(400).send('false');
  }
}
