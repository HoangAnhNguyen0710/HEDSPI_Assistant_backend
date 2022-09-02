/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) {}
    @Post()
    create(@Body() question: Question, @Req() req: Request, @Res() res: Response){
        return this.questionService.createQuestion(question, req, res);
        
    }
    @Get('/all')
    getAllQuestion(){
        return this.questionService.findAllNum();
    }

    @Get('')
    getQuestions(@Query() queryList, @Req() req: Request, @Res() res: Response ){
        return this.questionService.findperPage(queryList.page_num, queryList.max_items_per_page, res, queryList.sortBy);
    }

    @Get('/:id')
    getComments(@Param() param, @Req() req: Request, @Res() res: Response ){
        return this.questionService.getAllComments(parseInt(param.id), req, res);
    }
}
