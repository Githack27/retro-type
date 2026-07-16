import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const typingSessions = pgTable('typing_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  wpm: integer('wpm').notNull(),
  accuracy: integer('accuracy').notNull(),
  totalKeystrokes: integer('total_keystrokes').notNull(),
  correctKeystrokes: integer('correct_keystrokes').notNull(),
  incorrectKeystrokes: integer('incorrect_keystrokes').notNull(),
  duration: integer('duration').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userBadges = pgTable('user_badges', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  badgeType: text('badge_type').notNull(),
  awardedAt: timestamp('awarded_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type TypingSession = typeof typingSessions.$inferSelect;
export type NewTypingSession = typeof typingSessions.$inferInsert;

export type UserBadge = typeof userBadges.$inferSelect;
export type NewUserBadge = typeof userBadges.$inferInsert;
