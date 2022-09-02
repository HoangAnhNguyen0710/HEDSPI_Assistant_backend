import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
  ) {}

  async createComment(comment: Comment, req: Request, res: Response) {
    this.CommentRepository.save(comment);
    res.status(201).send(comment);
  }
}
