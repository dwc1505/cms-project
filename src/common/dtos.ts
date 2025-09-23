import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsIn, IsString, IsInt } from 'class-validator';

// =================================//
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsIn(['user', 'admin'])
  role?: string;
}
// =================================//
export class UpdateUserDto {
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsIn(['user', 'admin'])
  role?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
// =================================//
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()         
  @IsString()
  description?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()         
  @IsString()
  description?: string;
}
// =================================//
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()         
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()         
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  categoryId: number;
}
// =================================//