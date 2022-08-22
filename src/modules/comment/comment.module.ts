/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';

@Module({
    imports: [],
    controllers: [CommentController],
})
export class CommentModule {}
