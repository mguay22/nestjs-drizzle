import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() request: { name: string }) {
    return this.categoriesService.createCategory(request);
  }

  @Get()
  async getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post('post')
  async addToPost(@Body() request: { postId: number; categoryId: number }) {
    return this.categoriesService.addToPost(request);
  }
}
