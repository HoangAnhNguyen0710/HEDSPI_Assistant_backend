/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, Request } from 'express';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private readonly DocumentRepository: Repository<Document>
    ){}

    // findAll(): Observable<Question[]>{
    //     return from(this.QuestionRepository.find());
    // }
    async findAllNum(){
        const All = await this.DocumentRepository.find();
        if(All !== null)
        return All.length;
    }

    async findperPage(page_num: number, num_per_page: number, res: Response){
        // console.log(page_num);
        const pagination = await this.DocumentRepository.find();
        if(pagination !== null){
            if(page_num * num_per_page > pagination.length){
                const List = pagination.slice((page_num - 1) * num_per_page, pagination.length - 1)
                res.status(200).send(List);
            }
            else{
                const List = pagination.slice((page_num - 1) * num_per_page, page_num * num_per_page)
                res.status(200).send(List);
            }
        }
        else res.status(400);
    }
    // findOneById(id: number, req: Request, res: Response): Promise<Document> {
    async findOne(id: number, req: Request, res: Response) {
        const find = await this.DocumentRepository.findOne({
            where:{ 
                id: id, 
            }
        });
        if(find != null){
            res.status(200).send(find);
        }
        else res.status(400).send("Bài viết không tồn tại");
    }
    async createDocument(document: Document, req: Request, res: Response){
            this.DocumentRepository.save(document);
            res.status(201).send(document);
    }
}
