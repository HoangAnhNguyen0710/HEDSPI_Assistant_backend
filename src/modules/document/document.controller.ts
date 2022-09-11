/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { Document } from './document.entity';
import { DocumentService } from './document.service';


@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get('/search')
  getFindDocs(@Query() queryList, @Req() req: Request, @Res() res: Response){
    return this.documentService.searchDocsByName(queryList.title, req, res);
  }

  @Post()
  create(@Body() document: Document, @Req() req: Request, @Res() res: Response){
      return this.documentService.createDocument(document, req, res);
  }

  @Get('')
  getDocs(@Query() queryList, @Req() req: Request, @Res() res: Response ){
      return this.documentService.findperPage(queryList.type, queryList.page_num, queryList.max_items_per_page, res, queryList.sortBy, queryList.filter);
  }

  @Get('/all')
  getNumofDocs(@Query() queryList){
    return this.documentService.findAllNum(queryList.type, queryList.filter);
  }

  @Get(':id')
  getDocById(@Param() param, req: Request, @Res() res: Response){
    return this.documentService.findOneById(parseInt(param.id), req, res);
  }

  @Get('/:id/allComments')
  getComments(@Param() param, @Req() req: Request, @Res() res: Response ){
      return this.documentService.getAllComments(parseInt(param.id), req, res);
  }
}
