import { db } from '../db/index.js';
import { userBadges, type UserBadge, type NewUserBadge } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';

export interface IBadgeRepository {
  create(badge: NewUserBadge): Promise<UserBadge>;
  findByUserId(userId: string): Promise<UserBadge[]>;
  hasBadge(userId: string, badgeType: string): Promise<boolean>;
  deleteUserBadge(userId: string, badgeType: string): Promise<void>;
}

export class BadgeRepository implements IBadgeRepository {
  async create(badge: NewUserBadge): Promise<UserBadge> {
    const result = await db.insert(userBadges).values(badge).returning();
    return result[0];
  }

  async findByUserId(userId: string): Promise<UserBadge[]> {
    return db
      .select()
      .from(userBadges)
      .where(eq(userBadges.userId, userId));
  }

  async hasBadge(userId: string, badgeType: string): Promise<boolean> {
    const result = await db
      .select()
      .from(userBadges)
      .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeType, badgeType)))
      .limit(1);
    return result.length > 0;
  }

  async deleteUserBadge(userId: string, badgeType: string): Promise<void> {
    await db
      .delete(userBadges)
      .where(and(eq(userBadges.userId, userId), eq(userBadges.badgeType, badgeType)));
  }
}
