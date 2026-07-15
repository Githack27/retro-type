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

    // 1. Speed Badge (strictly one matching badge based on current average WPM)
    let speedBadge = 'Novice';
    if (avgWpm >= 150) {
      speedBadge = 'Legend';
    } else if (avgWpm >= 120) {
      speedBadge = 'Maestro';
    } else if (avgWpm >= 100) {
      speedBadge = 'Author';
    } else if (avgWpm >= 80) {
      speedBadge = 'Scribe';
    } else if (avgWpm >= 60) {
      speedBadge = 'Typist';
    } else if (avgWpm >= 40) {
      speedBadge = 'Writer';
    } else if (avgWpm >= 20) {
      speedBadge = 'Apprentice';
    }
    targetBadges.push(speedBadge);

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
