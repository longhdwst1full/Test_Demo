import express from 'express';
import {
    register,
    login,
    validUser,
    googleAuth,
    logout,
    searchUsers,
    updateInfo,
    getUserById,
} from '../controllers/userController.js';
import { Auth } from '../middleware/user.js';



const router = express.Router();
router.get('/auth/valid', Auth, validUser);
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/logout', Auth, logout);
router.post('/google', googleAuth);
router.get('/user?', Auth, searchUsers);
router.get('/users/:id', Auth, getUserById);
router.patch('/users/update/:id', Auth, updateInfo);

export default router;
