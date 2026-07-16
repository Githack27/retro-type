import { Request, Response } from 'express';
import { type SettingsRepository } from '../repositories/settings.repository.js';

export class SettingsController {
  constructor(private settingsRepository: SettingsRepository) {}

  getSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = (req as any).session;
      if (!session || !session.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const settings = await this.settingsRepository.findByUserId(session.userId);
      if (!settings) {
        res.status(200).json({
          userId: session.userId,
          difficulty: 'normal',
          quickRestart: 'off',
          repeatQuotes: 'off',
          blindMode: 'off',
          alwaysShowWordsHistory: 'off',
          singleListCommandLine: 'manual',
          minSpeed: 'off',
          minSpeedCustom: 100,
          minAccuracy: 'off',
          minAccuracyCustom: 90,
          soundVolume: '0.5',
          playSoundOnClick: 'off',
          playSoundOnError: 'off',
          playTimeWarning: 'off',
          fontSize: '2',
          fontFamily: 'Roboto Mono',
          localFont: '',
        });
        return;
      }
      res.status(200).json(settings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = (req as any).session;
      if (!session || !session.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const data = req.body;
      const settings = await this.settingsRepository.upsert({
        userId: session.userId,
        ...data,
      });
      res.status(200).json(settings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
