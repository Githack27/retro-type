import { type ITypingSessionRepository } from '../repositories/typing-session.repository.js';
import { type IBadgeRepository } from '../repositories/badge.repository.js';
import { type BadgeService } from './badge.service.js';
import { type TypingSession, type NewTypingSession } from '../db/schema.js';

export class TypingService {
  constructor(
    private typingSessionRepository: ITypingSessionRepository,
    private badgeRepository: IBadgeRepository,
    private badgeService: BadgeService
  ) {}

  async saveSession(userId: string, data: {
    wpm: number;
    accuracy: number;
    totalKeystrokes: number;
    correctKeystrokes: number;
    incorrectKeystrokes: number;
    duration: number;
  }): Promise<{ 
    session: TypingSession; 
    newlyAwardedBadges: string[]; 
    attemptNumber: number;
    prevWpm: number;
    prevAccuracy: number;
    newWpm: number;
    newAccuracy: number;
  }> {
    const newSession: NewTypingSession = {
      userId,
      wpm: data.wpm,
      accuracy: data.accuracy,
      totalKeystrokes: data.totalKeystrokes,
      correctKeystrokes: data.correctKeystrokes,
      incorrectKeystrokes: data.incorrectKeystrokes,
      duration: data.duration,
    };

    const prevMetrics = await this.typingSessionRepository.getAverageMetrics(userId);

    const session = await this.typingSessionRepository.create(newSession);

    const newMetrics = await this.typingSessionRepository.getAverageMetrics(userId);

    const newlyAwardedBadges = await this.badgeService.checkAndAwardBadges(userId);

    return {
      session,
      newlyAwardedBadges,
      attemptNumber: newMetrics.totalSessions,
      prevWpm: prevMetrics.avgWpm,
      prevAccuracy: prevMetrics.avgAccuracy,
      newWpm: newMetrics.avgWpm,
      newAccuracy: newMetrics.avgAccuracy,
    };
  }

  async getUserStats(userId: string) {
    await this.badgeService.checkAndAwardBadges(userId);

    const averages = await this.typingSessionRepository.getAverageMetrics(userId);
    const personalBests = await this.typingSessionRepository.getHighestMetrics(userId);
    const badges = await this.badgeRepository.findByUserId(userId);
    const badgeList = badges.map(b => b.badgeType);
    const history = await this.typingSessionRepository.findByUserId(userId);

    return {
      stats: {
        totalSessions: averages.totalSessions,
        avgWpm: averages.avgWpm,
        avgAccuracy: averages.avgAccuracy,
        personalBestWpm: personalBests.maxWpm,
        personalBestAccuracy: personalBests.maxAccuracy,
      },
      badges: badgeList,
      history: history.slice(0, 10),
    };
  }

  async getHeatmapData(userId: string) {
    return this.typingSessionRepository.getDailyActivityCount(userId);
  }
}
