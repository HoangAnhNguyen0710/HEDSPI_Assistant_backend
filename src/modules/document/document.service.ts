/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, Request } from 'express';
import { DataSource, Repository } from 'typeorm';
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
    // async findAllNum(){
    //     const All = await this.DocumentRepository.find();
    //     if(All !== null)
    //     return All.length;
    // }
    async findAllNum(type){
        let All = null;
        if(type !== "all"){
            All = await this.DocumentRepository.find({
                where:{ 
                    type: type, 
                }
            });
        }
        else All = await this.DocumentRepository.find();

        if(All !== null)
        return All.length;
    }

    async findperPage(type: string, page_num: number, num_per_page: number, res: Response){
        let pagination = null;
        if(type === "all"){
            pagination = await this.DocumentRepository.find({relations: {
                subject: true,
            },});
        }
        else {
            pagination = await this.DocumentRepository.find({
                where:{ 
                    type: type, 
                }
            });
        }
      
        if(pagination !== null){
            if(page_num * num_per_page > pagination.length){
                const List = pagination.slice((page_num - 1) * num_per_page, pagination.length)
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
