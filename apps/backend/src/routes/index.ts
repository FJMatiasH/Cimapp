import { Router } from 'express';
import healthRoutes from './health.routes';
import cimasRoutes from './cimas.routes';
import userListsRoutes from './userLists.routes';
import recommendationsRoutes from './recommendations.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/cimas', cimasRoutes);
router.use('/user-lists', userListsRoutes);
router.use('/recommendations', recommendationsRoutes);

export default router;
