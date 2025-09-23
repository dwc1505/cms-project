import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  // Tạo category
  async create(data: Partial<Category>): Promise<Category> {
    const category = this.repo.create(data);
    return this.repo.save(category);
  }

  // Lấy tất cả category
  findAll(): Promise<Category[]> {
    return this.repo.find();
  }

  // Lấy 1 category theo id
  async findOne(id: number): Promise<Category> {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  // Cập nhật category
  async update(id: number, data: Partial<Category>): Promise<Category> {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');

    Object.assign(category, data);  // gán dữ liệu mới
    return this.repo.save(category); // lưu và trả về entity cập nhật
  }

  // Xóa category
  async remove(id: number): Promise<Category> {
    const category = await this.repo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');

    await this.repo.remove(category); // xóa
    return category; // trả về entity vừa xóa để biết thông tin
  }
}
