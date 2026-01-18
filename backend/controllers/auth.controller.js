/**
 * @fileoverview Authentication Controller
 * @description Handles authentication-related HTTP requests (register, login, get current user)
 * @author Yosra Ziad - Software Engineer
 * @version 1.0.0
 */

import ApiResponse from '../utils/response.js';
import AuthService from '../services/auth.service.js';

const authService = new AuthService();

/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @param {Object} req.body - User registration data
 * @param {string} req.body.name - User name (required, min 3 characters)
 * @param {string} req.body.email - User email (required, valid email format, unique)
 * @param {string} req.body.password - User password (required, min 8 characters, must contain uppercase, lowercase, and number)
 * @param {number} [req.body.age] - User age (optional)
 * @param {string} [req.body.bio] - User bio (optional, max 500 characters)
 * @returns {Object} 201 - User created successfully with JWT token
 * @returns {Object} 400 - Validation error
 * @returns {Object} 409 - Email already exists
 * @example
 * // Request body:
 * {
 *   "name": "Ahmed Ali",
 *   "email": "ahmed@example.com",
 *   "password": "Password123",
 *   "age": 25,
 *   "bio": "Software Developer"
 * }
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, age, bio } = req.body;

    const result = await authService.register({
      name,
      email,
      password,
      age,
      bio,
    });

    return ApiResponse.success(
      res,
      result,
      'User registered successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 * @param {Object} req.body - User login credentials
 * @param {string} req.body.email - User email (required, valid email format)
 * @param {string} req.body.password - User password (required)
 * @returns {Object} 200 - Login successful with JWT token
 * @returns {Object} 400 - Validation error
 * @returns {Object} 401 - Invalid email or password
 * @returns {Object} 403 - Account is deactivated
 * @example
 * // Request body:
 * {
 *   "email": "ahmed@example.com",
 *   "password": "Password123"
 * }
 * 
 * // Response:
 * {
 *   "success": true,
 *   "data": {
 *     "user": { ... },
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   },
 *   "message": "Login successful",
 *   "status": 200
 * }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return ApiResponse.success(
      res,
      result,
      'Login successful',
      200
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 * @route GET /api/auth/me
 * @access Private (requires JWT token)
 * @param {Object} req.user - User object (set by auth middleware)
 * @returns {Object} 200 - User profile retrieved successfully
 * @returns {Object} 401 - Not authorized (missing or invalid token)
 * @returns {Object} 404 - User not found
 * @example
 * // Request headers:
 * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    // req.user will be set by auth middleware
    return ApiResponse.success(
      res,
      { user: req.user },
      'User profile retrieved successfully',
      200
    );
  } catch (error) {
    next(error);
  }
};
