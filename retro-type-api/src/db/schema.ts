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

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).primaryKey(),
  difficulty: text('difficulty').default('normal').notNull(),
  quickRestart: text('quick_restart').default('off').notNull(),
  repeatQuotes: text('repeat_quotes').default('off').notNull(),
  blindMode: text('blind_mode').default('off').notNull(),
  alwaysShowWordsHistory: text('always_show_words_history').default('off').notNull(),
  singleListCommandLine: text('single_list_command_line').default('manual').notNull(),
  minSpeed: text('min_speed').default('off').notNull(),
  minSpeedCustom: integer('min_speed_custom').default(100).notNull(),
  minAccuracy: text('min_accuracy').default('off').notNull(),
  minAccuracyCustom: integer('min_accuracy_custom').default(90).notNull(),
  soundVolume: text('sound_volume').default('0.5').notNull(),
  playSoundOnClick: text('play_sound_on_click').default('off').notNull(),
  playSoundOnError: text('play_sound_on_error').default('off').notNull(),
  playTimeWarning: text('play_time_warning').default('off').notNull(),
  fontSize: text('font_size').default('2').notNull(),
  fontFamily: text('font_family').default('Roboto Mono').notNull(),
  localFont: text('local_font').default('').notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type TypingSession = typeof typingSessions.$inferSelect;
export type NewTypingSession = typeof typingSessions.$inferInsert;

export type UserBadge = typeof userBadges.$inferSelect;
export type NewUserBadge = typeof userBadges.$inferInsert;

export type UserSettings = typeof userSettings.$inferSelect;
export type NewUserSettings = typeof userSettings.$inferInsert;
