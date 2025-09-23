import { Controller, Get, Post as PostRoute, Put, Delete, Param, Body } from '@nestjs/common';
import { PostService } from './posts.service';
import { Post } from './posts.entity';
import { CreatePostDto, UpdatePostDto } from 'src/common/dtos';

@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @PostRoute()
  create(@Body() body: CreatePostDto) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdatePostDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
