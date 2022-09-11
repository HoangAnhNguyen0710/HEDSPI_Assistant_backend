/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response, Request } from 'express';
import { Between, ILike, Repository } from 'typeorm';
import { Document } from './document.entity';
@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly DocumentRepository: Repository<Document>,
  ) {}

  // findAll(): Observable<Question[]>{
  //     return from(this.QuestionRepository.find());
  // }
  // async findAllNum(){
  //     const All = await this.DocumentRepository.find();
  //     if(All !== null)
  //     return All.length;
  // }
  async findAllNum(type, filter) {
    let All = null;
    if (filter !== undefined) {
      filter = JSON.parse(filter)
      All = await this.DocumentRepository.find({
        where: {
          program: ILike('%'+ filter.program + '%'),
          subject: {
            name: ILike('%'+ filter.subject_name + '%'),
            subject_code: ILike('%'+ filter.subject_code + '%'),
            semester: Between(filter.semester_1, filter.semester_2),
          },
        },
      });
    } else {
      if (type !== 'all') {
        All = await this.DocumentRepository.find({
          where: {
            type: type,
          },
        });
      } else All = await this.DocumentRepository.find();
    }

    if (All !== null) return All.length;
  }

  async findperPage(
    type: string,
    page_num: number,
    num_per_page: number,
    res: Response,
    sort,
    filter,
  ) {
    const sortBy = JSON.parse(sort);
    let pagination = null;
    if (filter !== undefined) {
      filter = JSON.parse(filter)
      pagination = await this.DocumentRepository.find({
        where: {
          program: ILike('%'+ filter.program + '%'),
          subject: {
            name: ILike('%'+ filter.subject_name + '%'),
            subject_code: ILike('%'+ filter.subject_code + '%'),
            semester: Between(filter.semester_1, filter.semester_2),
          },
        },
        relations: {
          subject: true,
          author: true,
          comments: true,
          likes: true,
        },
        order: {
          createdAt: sortBy.createdAt,
          likes: sortBy.likes,
        },
      });
    } else {
    if (type === 'all') {
      pagination = await this.DocumentRepository.find({
        relations: {
          subject: true,
          author: true,
          comments: true,
          likes: true,
        },
        order: {
          createdAt: sortBy.createdAt,
          likes: sortBy.likes,
        },
      });
    } else {
      pagination = await this.DocumentRepository.find({
        where: {
          type: type,
        },
        relations: {
          subject: true,
          author: true,
          comments: true,
          likes: true,
        },
        order: {
          createdAt: sortBy.createdAt,
          likes: sortBy.likes,
        },
      });
    }
    }
    if (pagination !== null) {
      if (page_num * num_per_page > pagination.length) {
        const List = pagination.slice(
          (page_num - 1) * num_per_page,
          pagination.length,
        );
        res.status(200).send(List);
      } else {
        const List = pagination.slice(
          (page_num - 1) * num_per_page,
          page_num * num_per_page,
        );
        res.status(200).send(List);
      }
    } else res.status(400);
  }

  // findOneById(id: number, req: Request, res: Response): Promise<Document> {
  async findOneById(id: number, req: Request, res: Response) {
    const find = await this.DocumentRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        author: true,
        subject: true,
        comments: true,
        likes: true,
      },
    });
    if (find != null) {
      res.status(200).send(find);
    } else res.status(400).send('Bài viết không tồn tại');
  }

  async createDocument(document: Document, req: Request, res: Response) {
    // const query = await this.DocumentRepository.createQueryBuilder('document')
    //   .select('MAX(document.id)', 'max')
    //   .getRawOne();
    // document.id = query.max + 1;
    const savedocs = await this.DocumentRepository.save(document);
    res.status(201).send(savedocs);
  }

  async getAllComments(id: number, req: Request, res: Response) {
    const find = await this.DocumentRepository.find({
      where: {
        id: id,
      },
      relations: {
        author: true,
        comments: {
          user: true,
        },
      },
    });
    if (find !== null) {
      res.status(200).send(find[0].comments);
    } else res.status(400).send('Review không tồn tại');
  }

  async searchDocsByName(title: string, req: Request, res: Response) {
    const find = await this.DocumentRepository.find({
      where: {
        title: ILike('%' + title + '%'),
      },
      relations: {
        author: true,
        likes: true,
        comments: {
          user: true,
        },
        subject: true,
      },
    });
    if (find.length > 0) {
      res.status(200).send(find);
    } else
      res
        .status(404)
        .send('Cannot find document with title like: ' + "'" + title + "'");
  }
}
