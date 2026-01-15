import express from 'express';
import {
  register,
  login,
  getCurrentUser,
} from '../controllers/auth.controller.js';
import {
  registerValidation,
  loginValidation,
  validate,
} from '../middleware/validation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerValidation, validate, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', loginValidation, validate, login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', protect, getCurrentUser);

export default router;
