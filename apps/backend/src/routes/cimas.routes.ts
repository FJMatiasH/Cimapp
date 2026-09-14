import { Router } from 'express';
import { listCimas, getCimaDetail } from '../controllers/cimas.controller';

const router = Router();

router.get('/', listCimas);
router.get('/:id', getCimaDetail);

export default router;
