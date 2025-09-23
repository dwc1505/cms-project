import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/common/dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.repo.create({
      email: data.email,
      password: hashedPassword,
      role: data.role ?? 'user',
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

  async update(id: number, data: Partial<Pick<User, 'role' | 'isActive'>>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    if (data.role !== undefined) user.role = data.role;
    if (data.isActive !== undefined) user.isActive = data.isActive;

    await this.repo.save(user);

    return {
      message: 'User updated successfully',
      user,
    };
  }

  async findByEmail(email: string) {
  const user = await this.repo.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundException(`User with email ${email} not found`);
  }
  return user;
}
}
