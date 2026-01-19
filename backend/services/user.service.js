import BaseService from './base.service.js';
import UserRepository from '../repositories/user.repository.js';

class UserService extends BaseService {
  constructor() {
    super(new UserRepository());
  }

  /**
   * Get user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User or null
   */
  async getUserByEmail(email) {
    return await this.repository.findByEmail(email);
  }

  /**
   * Create user with validation
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async createUser(userData) {
    // Check if user already exists
    const existingUser = await this.repository.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 400;
      throw error;
    }

    return await this.create(userData);
  }
}

export default UserService;
