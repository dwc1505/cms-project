import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/common/dtos';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  create(@Body() body: CreateCategoryDto) {
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
  update(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
