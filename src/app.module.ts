/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { SubjectModule } from './modules/subject/subject.module';
import { DocumentModule } from './modules/document/document.module';
import { QuestionModule } from './modules/question/question.module';
import { ReviewModule } from './modules/review/review.module';
import { AuthModule } from './auth/auth.module';
import { LikeModule } from './modules/like/like.module';
require('dotenv').config();
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule, CommentModule, SubjectModule, DocumentModule, QuestionModule, ReviewModule, AuthModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
