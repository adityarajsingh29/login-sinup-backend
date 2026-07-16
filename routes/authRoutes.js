import express from 'express';
import {
  signupUser,
  loginUser,
  getUserProfile,
  checkAuth,
  logoutUser,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.get('/check-auth', protect, checkAuth);

export default router;
