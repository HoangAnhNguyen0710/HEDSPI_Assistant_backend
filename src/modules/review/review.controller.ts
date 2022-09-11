/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Query, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService) {}
    @Post()
    create(@Body() review: Review, @Req() req: Request, @Res() res: Response){
        return this.reviewService.createReview(review, req, res);
        
    }
    
    @Get('/all')
    getNumofDocs(@Query() queryList){
      return this.reviewService.findAllNum(queryList.type);
    }

    @Get('')
    getQuestions(@Query() queryList, @Req() req: Request, @Res() res: Response ){
        return this.reviewService.findperPage(queryList.type, queryList.page_num, queryList.max_items_per_page, res);
    }

    @Get('/:id')
    getComments(@Param() param, @Req() req: Request, @Res() res: Response ){
        return this.reviewService.getAllComments(parseInt(param.id), req, res);
    }


}
