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
    const crePost = await this.repo.save(post);
    return {
      message: 'Post created successfully',
      post: crePost,
    };
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.repo.find({ relations: ['category'] });
    if (!posts || posts.length === 0) {
      throw new NotFoundException('No posts found');
    }
    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.repo.findOne({ 
      where: { id }, 
      relations: ['category'] 
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(id: number, data: Partial<Post> & { categoryId?: number }) {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');

    if (data.categoryId) {
      const category = await this.categoryRepo.findOneBy({ id: data.categoryId });
      if (!category) throw new NotFoundException(`Category id ${data.categoryId} not found`);
      post.category = category;
    }

    Object.assign(post, {
      title: data.title ?? post.title,
      content: data.content ?? post.content,
      description: data.description ?? post.description,
    });
    const newPost = await this.repo.save(post);      
    return {
      message: 'Post updated successfully',
      post: newPost,
    }
    
  }

  async remove(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException(`Post id ${id} not found`);

    await this.repo.remove(post);
    return {
      message: 'Post deleted successfully'
    }
  }
}
