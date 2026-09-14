import { Router } from 'express';
import { getUserLists, toggleUserList, addToList, removeFromList } from '../controllers/userLists.controller';

const router = Router();

router.get('/', getUserLists);
router.post('/toggle', toggleUserList);
router.post('/:listType/:cimaId', addToList);
router.delete('/:listType/:cimaId', removeFromList);

export default router;
