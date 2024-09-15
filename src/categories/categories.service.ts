import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase, NodePgTransaction } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from './schema';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async createCategory(
    category: typeof schema.categories.$inferInsert,
    tx?: NodePgTransaction<any, any>,
  ) {
    return (
      await (tx || this.database)
        .insert(schema.categories)
        .values(category)
        .returning({ id: schema.categories.id })
    )[0];
  }

  async addToPost(
    postToCategory: typeof schema.postsToCategories.$inferInsert,
    tx?: NodePgTransaction<any, any>,
  ) {
    await (tx || this.database)
      .insert(schema.postsToCategories)
      .values(postToCategory);
  }

  async getCategories() {
    return this.database.query.categories.findMany({
      with: {
        postsToCategories: true,
      },
    });
  }
}
