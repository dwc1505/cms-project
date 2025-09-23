import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { User } from '../users/user.entity';
import { Category } from '../categories/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Category])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
