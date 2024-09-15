import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from '../users/schema';
import { relations } from 'drizzle-orm';
import { postsToCategories } from '../categories/schema';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content'),
  published: boolean('published').default(false),
  timestamp: timestamp('timestamp').defaultNow(),
  userId: integer('user_id').references(() => users.id),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  postsToCategories: many(postsToCategories),
}));
