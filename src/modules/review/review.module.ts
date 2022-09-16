/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ReviewController } from './review.controller';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review, User])],
    controllers:[ReviewController],
    providers:[ReviewService],
})
export class ReviewModule {}
