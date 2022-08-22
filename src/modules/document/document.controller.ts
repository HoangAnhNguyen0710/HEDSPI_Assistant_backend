/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Document } from './document.entity';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private DocumentService: DocumentService) {}
  @Post()
  create(@Body() document: Document, @Req() req: Request, @Res() res: Response){
      return this.DocumentService.createDocument(document, req, res);
  }
}
