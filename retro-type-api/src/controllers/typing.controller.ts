import { Request, Response } from 'express';
import { type TypingService } from '../services/typing.service.js';

export class TypingController {
  constructor(private typingService: TypingService) {}

  saveSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).session.userId;
      const { wpm, accuracy, totalKeystrokes, correctKeystrokes, incorrectKeystrokes, duration } = req.body;
      
      if (wpm === undefined || accuracy === undefined) {
        res.status(400).json({ error: 'WPM and accuracy are required.' });
        return;
      }

      const result = await this.typingService.saveSession(userId, {
        wpm: Math.round(Number(wpm)),
        accuracy: Math.round(Number(accuracy)),
        totalKeystrokes: Math.round(Number(totalKeystrokes || 0)),
        correctKeystrokes: Math.round(Number(correctKeystrokes || 0)),
        incorrectKeystrokes: Math.round(Number(incorrectKeystrokes || 0)),
        duration: Math.round(Number(duration || 0)),
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getUserStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).session.userId;
      const result = await this.typingService.getUserStats(userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getHeatmapData = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).session.userId;
      const result = await this.typingService.getHeatmapData(userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
