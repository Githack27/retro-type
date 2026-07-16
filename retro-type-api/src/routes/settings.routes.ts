import { Router } from 'express';
import { SettingsController } from '../controllers/settings.controller.js';
import { SettingsRepository } from '../repositories/settings.repository.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
const settingsRepository = new SettingsRepository();
const settingsController = new SettingsController(settingsRepository);

router.get('/', authMiddleware, settingsController.getSettings);
router.post('/', authMiddleware, settingsController.updateSettings);

export default router;
