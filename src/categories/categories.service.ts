import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/common/dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    const category = this.repo.create(data);
    const creCategory = await this.repo.save(category);
    return {
      message: 'Category created successfully',
      category: creCategory,
    };
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.repo.find();
    if (!categories || categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    Object.assign(category, data); 
    const newCate = await this.repo.save(category);
    return {
      message: 'Category updated successfully',
      category: newCate,
    } 
  }

  async remove(id: number) {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException(`Category with id ${id} not found`);

    await this.repo.remove(category);
    return {
      message: 'Category deleted successfully',
    };
  }
}
