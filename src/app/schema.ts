import { relations } from "drizzle-orm";
import type { InferModel } from "drizzle-orm";
import {
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";

export const posts = pgTable("posts", {
	id: uuid("id").defaultRandom().primaryKey(),
	detail: text("detail").notNull(),
	title: text("title").notNull(),
	user: text("id").notNull(),
	createdAt: timestamp("xata_created_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
	updatedAt: timestamp("xata_updated_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
});

export const insertPostSchema = createInsertSchema(posts, {
	detail: v.string(),
	title: v.string(),
	user: v.string(),
});
export const selectPostSchema = createSelectSchema(posts, {
	id: v.string(),
	user: v.string(),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey(),
	fullName: text("full_name").notNull(),
	email: text("email").unique().notNull(),
	password: text("password").notNull(),
	avatar: text("avatar"),
});

export type User = InferModel<typeof users>;

export type InsertUser = typeof users.$inferInsert;

export type SelectUser = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users, {
	fullName: v.string([v.minLength(1), v.maxLength(100)]),
	email: v.string([v.email()]),
	password: v.string([v.minLength(8), v.maxLength(15)]),
});
export const selectUserSchema = createSelectSchema(users, {
	id: v.string(),
	fullName: v.string(),
	email: v.string([v.email()]),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
	user: one(users, {
		fields: [posts.user],
		references: [users.id],
	}),
}));
