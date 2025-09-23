import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { Category } from '../categories/categories.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repo: Repository<Post>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  // Tạo post
  async create(data: { 
  title: string; 
  content: string; 
  description?: string;   
  categoryId: number 
}) {
  const category = await this.categoryRepo.findOneBy({ id: data.categoryId });
  if (!category) throw new NotFoundException('Category not found');

  const post = this.repo.create({
    title: data.title,
    content: data.content,
    description: data.description ?? '', 
    category,
  });

  return this.repo.save(post);
}


  // Lấy tất cả post
  async findAll() {
  return this.repo.find({
    relations: ['category'],
  });
}
  
  // Lấy 1 post theo id
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  // Cập nhật post
  async update(id: number, data: Partial<Post> & { categoryId?: number }) {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');

    if (data.categoryId) {
      const category = await this.categoryRepo.findOneBy({ id: data.categoryId });
      if (!category) throw new NotFoundException('Category not found');
      post.category = category;
    }

    Object.assign(post, {
      title: data.title ?? post.title,
      content: data.content ?? post.content,
      description: data.description ?? post.description,
    });

    return this.repo.save(post);
  }

  // Xóa post
  async remove(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');

    await this.repo.remove(post);
    return post;
  }
}
