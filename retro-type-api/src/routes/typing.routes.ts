import { Router } from 'express';
import { TypingController } from '../controllers/typing.controller.js';
import { TypingService } from '../services/typing.service.js';
import { TypingSessionRepository } from '../repositories/typing-session.repository.js';
import { BadgeRepository } from '../repositories/badge.repository.js';
import { BadgeService } from '../services/badge.service.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

const typingSessionRepository = new TypingSessionRepository();
const badgeRepository = new BadgeRepository();
const badgeService = new BadgeService(badgeRepository, typingSessionRepository);
const typingService = new TypingService(typingSessionRepository, badgeRepository, badgeService);
const typingController = new TypingController(typingService);

router.post('/session', authMiddleware, typingController.saveSession);
router.get('/stats', authMiddleware, typingController.getUserStats);
router.get('/heatmap', authMiddleware, typingController.getHeatmapData);

export default router;
