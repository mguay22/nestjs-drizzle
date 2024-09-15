import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { posts } from '../posts/schema';
import { relations } from 'drizzle-orm';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  postsToCategories: many(postsToCategories),
}));

export const postsToCategories = pgTable(
  'posts_to_categories',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id),
    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.categoryId] }),
  }),
);

export const postsToCategoriesRelations = relations(
  postsToCategories,
  ({ one }) => ({
    post: one(posts, {
      fields: [postsToCategories.postId],
      references: [posts.id],
    }),
    category: one(categories, {
      fields: [postsToCategories.categoryId],
      references: [categories.id],
    }),
  }),
);
