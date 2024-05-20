import express from 'express';
import {
    accessChats,
    fetchAllChats,
    creatGroup,
    renameGroup,
    addToGroup,
    removeFromGroup,
} from '../controllers/chatController.js';
import { Auth } from '../middleware/user.js';

const router = express.Router();

router.post('/', Auth, accessChats);
router.get('/', Auth, fetchAllChats);
router.post('/group', Auth, creatGroup);
router.patch('/group/rename', Auth, renameGroup);
router.patch('/groupAdd', Auth, addToGroup);
router.patch('/groupRemove', Auth, removeFromGroup);
router.delete('/removeuser', Auth);

export default router;
