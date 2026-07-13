import { Router } from 'express';
import authRoutes from './auth.routes.js';
import typingRoutes from './typing.routes.js';
import rankingsRoutes from './rankings.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/typing', typingRoutes);
router.use('/rankings', rankingsRoutes);

export default router;
