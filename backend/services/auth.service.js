/**
 * @fileoverview Authentication Service
 * @description Business logic for user authentication (register, login, token management)
 * @author Yosra Ziad - Software Engineer
 * @version 1.0.0
 */

import UserRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';

/**
 * Authentication Service Class
 * Handles user registration, login, and JWT token management
 */
class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user and token
   */
  async register(userData) {
    const { name, email, password, age, bio } = userData;

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    // Create new user (password will be hashed automatically by pre-save hook)
    const user = await this.userRepository.create({
      name,
      email,
      password,
      age,
      bio,
    });

    // Generate JWT token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User and token
   */
  async login(email, password) {
    // Find user by email and include password
    const user = await this.userRepository.findByEmailWithPassword(email);
    
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Check if user is active
    if (!user.isActive) {
      const error = new Error('Account is deactivated');
      error.statusCode = 403;
      throw error;
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  /**
   * Generate JWT token
   * @param {string} userId - User ID
   * @returns {string} JWT token
   */
  generateToken(userId) {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    return jwt.sign({ id: userId }, secret, { expiresIn });
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Object} Decoded token
   */
  verifyToken(token) {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      const err = new Error('Invalid or expired token');
      err.statusCode = 401;
      throw err;
    }
  }
}

export default AuthService;
