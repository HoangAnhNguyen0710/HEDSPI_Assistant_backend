import { LikeService } from './like.service';
import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Req,
  Res,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}
  @Post()
  create(@Body() queryList, @Req() req: Request, @Res() res: Response) {
    return this.likeService.createLike(
      queryList.user,
      queryList.article,
      queryList.article_type,
      req,
      res,
    );
  }

  @Get('/delete')
  delete(@Query() queryList, @Req() req: Request, @Res() res: Response) {
    console.log(queryList);
    return this.likeService.deleteLike(parseInt(queryList.id), req, res);
  }

  @Get('/check')
  checkLikeOrNot(
    @Query() queryList,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // console.log(queryList);
    return this.likeService.checkLikeOrNot(
      queryList.author_id,
      queryList.article_id,
      queryList.article_type,
      req,
      res,
    );
  }
}
