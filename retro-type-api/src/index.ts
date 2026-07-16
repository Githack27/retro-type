import app from './app.js';
import { execSync } from 'child_process';
import { db } from './db/index.js';
import { userBadges } from './db/schema.js';
import { not, inArray } from 'drizzle-orm';

const PORT = process.env.PORT || 5000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function startServer() {
  const maxRetries = 5;
  let attempt = 1;
  while (attempt <= maxRetries) {
    try {
      console.log(`[Database] Attempting schema sync (attempt ${attempt}/${maxRetries})...`);
      execSync('npx drizzle-kit push --force', { stdio: 'inherit' });
      console.log('[Database] Schema sync completed successfully.');
      break;
    } catch (err: any) {
      console.error(`[Database] Schema sync failed on attempt ${attempt}.`);
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
