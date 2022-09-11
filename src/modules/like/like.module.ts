import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from './like.controller';
import { Like } from './like.entity';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
