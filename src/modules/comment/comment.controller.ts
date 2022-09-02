/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService){}

    @Post()
    create(@Body() comment: Comment, @Req() req: Request, @Res() res:Response){
        return this.commentService.createComment(comment, req, res);
    }


}
