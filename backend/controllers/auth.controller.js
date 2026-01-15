import ApiResponse from '../utils/response.js';
import AuthService from '../services/auth.service.js';

const authService = new AuthService();

/**
 * Register a new user
 * @route POST /api/auth/register
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
