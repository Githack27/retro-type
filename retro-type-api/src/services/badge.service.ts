import { type IBadgeRepository } from '../repositories/badge.repository.js';
import { type ITypingSessionRepository } from '../repositories/typing-session.repository.js';

export class BadgeService {
  constructor(
    private badgeRepository: IBadgeRepository,
    private typingSessionRepository: ITypingSessionRepository
  ) {}

  async checkAndAwardBadges(userId: string): Promise<string[]> {
    const { avgWpm, avgAccuracy, totalSessions } = await this.typingSessionRepository.getAverageMetrics(userId);
    
    if (totalSessions === 0) {
      // If no sessions, remove all badges and return
      const existingBadges = await this.badgeRepository.findByUserId(userId);
      for (const badge of existingBadges) {
        await this.badgeRepository.deleteUserBadge(userId, badge.badgeType);
      }
      return [];
    }

    const targetBadges: string[] = [];

    // 1. Speed Badge (strictly one matching badge based on current average WPM and Accuracy)
    let speedBadge = 'Novice';
    if (avgWpm >= 150 && avgAccuracy >= 98) {
      speedBadge = 'Legend';
    } else if (avgWpm >= 120 && avgAccuracy >= 95) {
      speedBadge = 'Maestro';
    } else if (avgWpm >= 100 && avgAccuracy >= 95) {
      speedBadge = 'Author';
    } else if (avgWpm >= 80 && avgAccuracy >= 90) {
      speedBadge = 'Scribe';
    } else if (avgWpm >= 60 && avgAccuracy >= 90) {
      speedBadge = 'Typist';
    } else if (avgWpm >= 40 && avgAccuracy >= 90) {
      speedBadge = 'Writer';
    } else if (avgWpm >= 20 && avgAccuracy >= 85) {
      speedBadge = 'Apprentice';
    }
    targetBadges.push(speedBadge);

    // 2. Accuracy Badge (strictly one highest matching badge, or none)
    let accuracyBadge: string | null = null;
    if (avgAccuracy >= 98) {
      accuracyBadge = 'Laser Precision';
    } else if (avgAccuracy >= 95) {
      accuracyBadge = 'Sniper';
    } else if (avgAccuracy >= 90) {
      accuracyBadge = 'Steady Fingers';
    }
    if (accuracyBadge) {
      targetBadges.push(accuracyBadge);
    }

    // 3. Volume Badge (strictly one highest matching badge, or none)
    let volumeBadge: string | null = null;
    if (totalSessions >= 50) {
      volumeBadge = 'Grandmaster';
    } else if (totalSessions >= 20) {
      volumeBadge = 'Wordsmith';
    } else if (totalSessions >= 5) {
      volumeBadge = 'Keyboard Enthusiast';
    }
    if (volumeBadge) {
      targetBadges.push(volumeBadge);
    }

    // Reconcile with database
    const existingBadges = await this.badgeRepository.findByUserId(userId);
    const existingTypes = existingBadges.map(b => b.badgeType);

    // Delete existing badges that are NOT in the target badges list
    const toDelete = existingTypes.filter(type => !targetBadges.includes(type));
    for (const badgeType of toDelete) {
      await this.badgeRepository.deleteUserBadge(userId, badgeType);
    }

    // Create target badges that are NOT already in the database
    const newlyAwarded: string[] = [];
    for (const badgeType of targetBadges) {
      if (!existingTypes.includes(badgeType)) {
        await this.badgeRepository.create({
          userId,
          badgeType,
        });
        newlyAwarded.push(badgeType);
      }
    }

    return newlyAwarded;
  }
}
