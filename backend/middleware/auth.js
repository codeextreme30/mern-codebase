/**
 * @fileoverview Authentication Middleware
 * @description Middleware for protecting routes and verifying JWT tokens
 * @author Yosra Ziad - Software Engineer
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import ApiResponse from '../utils/response.js';

/**
 * Protect routes - Verify JWT token
 * @description Middleware to protect routes that require authentication
 * Extracts JWT token from Authorization header, verifies it, and attaches user to request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * @throws {401} If token is missing, invalid, or expired
 * @throws {404} If user not found
 * @throws {403} If account is deactivated
 * @example
 * // Usage in routes:
 * router.get('/protected', protect, controller);
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return ApiResponse.unauthorized(res, 'Not authorized to access this route. Please login.');
  }

  try {
    // Verify token
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, secret);

    // Ensure token contains user id
    if (!decoded || !decoded.id) {
      return ApiResponse.unauthorized(res, 'Invalid token payload');
    }

    // Get user from token
    const user = await User.findById(decoded.id);

    if (!user) {
      return ApiResponse.notFound(res, 'User not found');
    }

    // Check if user is active
    if (!user.isActive) {
      return ApiResponse.forbidden(res, 'Account is deactivated');
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    return ApiResponse.unauthorized(res, 'Not authorized. Invalid or expired token.');
  }
};

/**
 * Grant access to specific roles
 * @description Middleware to restrict access based on user roles
 * Must be used after protect middleware
 * @param {...string} roles - Allowed roles (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 * @throws {403} If user role is not authorized
 * @example
 * // Usage in routes:
 * router.get('/admin-only', protect, authorize('admin'), controller);
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};
