import express from 'express';
import UserManagerController from '../controllers/UserManagerController.js';

const router = express.Router();

router.get('', UserManagerController.getList);
router.patch('/:id/:isActived', UserManagerController.updateActived);

export default router;