import BaseRepository from './base.repository.js';
import User from '../models/user.model.js';

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User or null
   */
  async findByEmail(email) {
    return await this.findOne({ email: email.toLowerCase() });
  }

  /**
   * Find user by email with password (for authentication)
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User with password or null
   */
  async findByEmailWithPassword(email) {
    return await this.model.findOne({ email: email.toLowerCase() }).select('+password');
  }
}

export default UserRepository;
