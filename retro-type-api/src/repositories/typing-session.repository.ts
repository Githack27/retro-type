import { db } from '../db/index.js';
import { typingSessions, users, userBadges, type TypingSession, type NewTypingSession } from '../db/schema.js';
import { eq, sql, desc } from 'drizzle-orm';

export interface LeaderboardEntry {
  username: string;
  maxWpm: number;
  maxAccuracy: number;
  totalSessions: number;
  badges: string[];
}

export interface ITypingSessionRepository {
  create(session: NewTypingSession): Promise<TypingSession>;
  findByUserId(userId: string): Promise<TypingSession[]>;
  getAverageMetrics(userId: string): Promise<{ avgWpm: number; avgAccuracy: number; totalSessions: number }>;
  getHighestMetrics(userId: string): Promise<{ maxWpm: number; maxAccuracy: number }>;
  getDailyActivityCount(userId: string): Promise<{ date: string; count: number }[]>;
  getGlobalLeaderboard(): Promise<LeaderboardEntry[]>;
}

export class TypingSessionRepository implements ITypingSessionRepository {
  async create(session: NewTypingSession): Promise<TypingSession> {
    const result = await db.insert(typingSessions).values(session).returning();
    return result[0];
  }

  async findByUserId(userId: string): Promise<TypingSession[]> {
    return db
      .select()
      .from(typingSessions)
      .where(eq(typingSessions.userId, userId))
      .orderBy(desc(typingSessions.createdAt));
  }

  async getAverageMetrics(userId: string): Promise<{ avgWpm: number; avgAccuracy: number; totalSessions: number }> {
    const result = await db
      .select({
        avgWpm: sql<string>`COALESCE(AVG(${typingSessions.wpm}), 0)`,
        avgAccuracy: sql<string>`COALESCE(AVG(${typingSessions.accuracy}), 0)`,
        totalSessions: sql<string>`COUNT(*)`,
      })
      .from(typingSessions)
      .where(eq(typingSessions.userId, userId));

    const row = result[0];
    return {
      avgWpm: Math.round(Number(row?.avgWpm || 0)),
      avgAccuracy: Math.round(Number(row?.avgAccuracy || 0)),
      totalSessions: Number(row?.totalSessions || 0),
    };
  }

  async getHighestMetrics(userId: string): Promise<{ maxWpm: number; maxAccuracy: number }> {
    const result = await db
      .select({
        maxWpm: sql<string>`COALESCE(MAX(${typingSessions.wpm}), 0)`,
        maxAccuracy: sql<string>`COALESCE(MAX(${typingSessions.accuracy}), 0)`,
      })
      .from(typingSessions)
      .where(eq(typingSessions.userId, userId));

    const row = result[0];
    return {
      maxWpm: Number(row?.maxWpm || 0),
      maxAccuracy: Number(row?.maxAccuracy || 0),
    };
  }

  async getDailyActivityCount(userId: string): Promise<{ date: string; count: number }[]> {
    const result = await db
      .select({
        date: sql<string>`TO_CHAR(${typingSessions.createdAt}, 'YYYY-MM-DD')`,
        count: sql<string>`COUNT(*)::int`,
      })
      .from(typingSessions)
      .where(eq(typingSessions.userId, userId))
      .groupBy(sql`TO_CHAR(${typingSessions.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`TO_CHAR(${typingSessions.createdAt}, 'YYYY-MM-DD')`);

    return result.map(row => ({
      date: row.date,
      count: Number(row.count),
    }));
  }

  async getGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
    const leaderboard = await db
      .select({
        userId: users.id,
        username: users.username,
        maxWpm: sql<string>`MAX(${typingSessions.wpm})`,
        maxAccuracy: sql<string>`MAX(${typingSessions.accuracy})`,
        totalSessions: sql<string>`COUNT(${typingSessions.id})::int`,
      })
      .from(users)
      .innerJoin(typingSessions, eq(users.id, typingSessions.userId))
      .groupBy(users.id, users.username)
      .orderBy(desc(sql`MAX(${typingSessions.wpm})`), desc(sql`MAX(${typingSessions.accuracy})`));

    const badges = await db.select().from(userBadges);

    return leaderboard.map((row) => {
      const userBadgesList = badges
        .filter((b) => b.userId === row.userId)
        .map((b) => b.badgeType);

      return {
        username: row.username,
        maxWpm: Number(row.maxWpm || 0),
        maxAccuracy: Number(row.maxAccuracy || 0),
        totalSessions: Number(row.totalSessions || 0),
        badges: userBadgesList,
      };
    });
  }
}
