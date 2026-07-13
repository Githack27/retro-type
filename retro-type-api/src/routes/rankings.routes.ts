import { Router } from 'express';
import { RankingsController } from '../controllers/rankings.controller.js';
import { TypingSessionRepository } from '../repositories/typing-session.repository.js';

const router = Router();

const typingSessionRepository = new TypingSessionRepository();
const rankingsController = new RankingsController(typingSessionRepository);

router.get('/', rankingsController.getLeaderboard);

export default router;
