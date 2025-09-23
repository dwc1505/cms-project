import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(data: { email: string; password: string }) {
    const user = this.repo.create({
      ...data,
      role: 'user',
    });
    const creUser = await this.repo.save(user);
    
    return {
      message: 'User created successfully',
      user: creUser,
    };
  }

  async findAll() {
    const users = await this.repo.find();
    if(!users){
      throw new NotFoundException(`Not users found`);
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { role, ...updateData } = data;

    await this.repo.update(id, {
      ...updateData,
      role: 'user',
    });

    const updatedUser = await this.findOne(id);

    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }

  async remove(id: number) {
    const deleUser = await this.repo.delete(id);
    if (deleUser.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      message: 'User deleted successfully',
      deleted: true,
    };
  }
}
