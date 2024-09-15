import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany({
      with: { posts: true, profile: true },
    });
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    await this.database.insert(schema.users).values(user);
  }

  async createProfile(profile: typeof schema.profile.$inferInsert) {
    await this.database.insert(schema.profile).values(profile);
  }
}
