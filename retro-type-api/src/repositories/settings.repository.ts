import { db } from '../db/index.js';
import { userSettings, type UserSettings, type NewUserSettings } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export interface ISettingsRepository {
  findByUserId(userId: string): Promise<UserSettings | null>;
  upsert(settings: NewUserSettings): Promise<UserSettings>;
}

export class SettingsRepository implements ISettingsRepository {
  async findByUserId(userId: string): Promise<UserSettings | null> {
    const result = await db.select().from(userSettings).where(eq(userSettings.userId, userId)).limit(1);
    return result[0] || null;
  }

  async upsert(settings: NewUserSettings): Promise<UserSettings> {
    const result = await db
      .insert(userSettings)
      .values(settings)
      .onConflictDoUpdate({
        target: userSettings.userId,
        set: {
          difficulty: settings.difficulty,
          quickRestart: settings.quickRestart,
          repeatQuotes: settings.repeatQuotes,
          blindMode: settings.blindMode,
          alwaysShowWordsHistory: settings.alwaysShowWordsHistory,
          singleListCommandLine: settings.singleListCommandLine,
          minSpeed: settings.minSpeed,
          minSpeedCustom: settings.minSpeedCustom,
          minAccuracy: settings.minAccuracy,
          minAccuracyCustom: settings.minAccuracyCustom,
          soundVolume: settings.soundVolume,
          playSoundOnClick: settings.playSoundOnClick,
          playSoundOnError: settings.playSoundOnError,
          playTimeWarning: settings.playTimeWarning,
          fontSize: settings.fontSize,
          fontFamily: settings.fontFamily,
          localFont: settings.localFont,
        },
      })
      .returning();
    return result[0];
  }
}
