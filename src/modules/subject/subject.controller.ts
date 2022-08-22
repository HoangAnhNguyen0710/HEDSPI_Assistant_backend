/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
    constructor(private subjectService: SubjectService) {}
    @Get('all')
    getAllSubjects(){
        return this.subjectService.findAll();
    }

    @Get(':subject_code')
    getOneSubject(@Param('subject_code') subjet_code: string, @Req() req: Request, @Res() res: Response){
        return this.getOneSubject(subjet_code, req, res);
    }
}
