import app from './app.js';
import { db } from './db/index.js';
import { userBadges } from './db/schema.js';
import { not, inArray, sql } from 'drizzle-orm';

const PORT = process.env.PORT || 5000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function startServer() {
  const maxRetries = 5;
  let attempt = 1;
  while (attempt <= maxRetries) {
    try {
      console.log(`[Database] Attempting schema sync (attempt ${attempt}/${maxRetries})...`);
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS "user_settings" (
          "user_id" uuid PRIMARY KEY NOT NULL,
          "difficulty" text DEFAULT 'normal' NOT NULL,
          "quick_restart" text DEFAULT 'off' NOT NULL,
          "repeat_quotes" text DEFAULT 'off' NOT NULL,
          "blind_mode" text DEFAULT 'off' NOT NULL,
          "always_show_words_history" text DEFAULT 'off' NOT NULL,
          "single_list_command_line" text DEFAULT 'manual' NOT NULL,
          "min_speed" text DEFAULT 'off' NOT NULL,
          "min_speed_custom" integer DEFAULT 100 NOT NULL,
          "min_accuracy" text DEFAULT 'off' NOT NULL,
          "min_accuracy_custom" integer DEFAULT 90 NOT NULL,
          "sound_volume" text DEFAULT '0.5' NOT NULL,
          "play_sound_on_click" text DEFAULT 'off' NOT NULL,
          "play_sound_on_error" text DEFAULT 'off' NOT NULL,
          "play_time_warning" text DEFAULT 'off' NOT NULL,
          "font_size" text DEFAULT '2' NOT NULL,
          "font_family" text DEFAULT 'Special Elite' NOT NULL,
          "local_font" text DEFAULT '' NOT NULL,
          CONSTRAINT "user_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade
        );
      `);
      console.log('[Database] Schema sync completed successfully.');
      break;
    } catch (err: any) {
      console.error(`[Database] Schema sync failed on attempt ${attempt}:`, err.message);
      if (attempt === maxRetries) {
        console.error('[Database] Critical: Schema sync failed. Starting server anyway...');
      } else {
        attempt++;
        await delay(3000);
      }
    }
  }

  try {
    console.log('[Database] Cleaning up invalid badges...');
    await db.delete(userBadges).where(
      not(
        inArray(userBadges.badgeType, [
          'Novice',
          'Apprentice',
          'Writer',
          'Typist',
          'Scribe',
          'Author',
          'Maestro',
          'Legend',
        ])
      )
    );
    console.log('[Database] Invalid badges cleanup complete.');
  } catch (err: any) {
    console.error('[Database] Failed to clean up invalid badges:', err);
  }

  app.listen(PORT, () => {
    console.log(`[RetroType API] Backend server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[RetroType API] Failed to start server:', err);
});
