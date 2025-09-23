import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'cms_project',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    PostModule,
    CategoriesModule,
    AuthModule,
    AdminModule,
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}