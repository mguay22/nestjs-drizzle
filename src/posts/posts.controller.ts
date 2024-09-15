import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequest } from './dto/create-post.request';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postsService.getPosts();
  }

  @Patch(':id')
  async updatePost(
    @Param('id') postId: string,
    @Body() request: { content: string },
  ) {
    return this.postsService.updatePost(parseInt(postId), request);
  }

  @Get(':id')
  async getPost(@Param('id') postId: string) {
    return this.postsService.getPost(parseInt(postId));
  }

  @Post()
  async createPost(@Body() request: CreatePostRequest) {
    return this.postsService.createPost(
      {
        content: request.content,
        userId: request.userId,
      },
      request.category,
    );
  }
}
