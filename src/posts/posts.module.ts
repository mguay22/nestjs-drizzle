import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DatabaseModule } from '../database/database.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [DatabaseModule, CategoriesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
