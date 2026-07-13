import { Request, Response } from 'express';
import { type ITypingSessionRepository } from '../repositories/typing-session.repository.js';

export class RankingsController {
  constructor(private typingSessionRepository: ITypingSessionRepository) {}

  getLeaderboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const leaderboard = await this.typingSessionRepository.getGlobalLeaderboard();
      res.status(200).json(leaderboard);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
