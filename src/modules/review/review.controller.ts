/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}
    @Post()
    create(@Body() review: Review, @Req() req: Request, @Res() res: Response){
        return this.reviewService.createQuestion(review, req, res);
        
    }
    @Get('/all')
    getAllQuestion(){
        return this.reviewService.findAllNum();
    }

    @Get('')
    getQuestions(@Query() queryList, @Req() req: Request, @Res() res: Response ){
        return this.reviewService.findperPage(queryList.page_num, queryList.max_items_per_page, res);
    }
}
