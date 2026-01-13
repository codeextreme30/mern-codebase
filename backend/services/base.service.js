/**
 * Base Service Class
 * Provides common business logic operations for all services
 */
class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Create a new entity
   * @param {Object} data - Data to create
   * @returns {Promise<Object>} Created entity
   */
  async create(data) {
    try {
      return await this.repository.create(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all entities with optional filters
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Object containing data and pagination info
   */
  async getAll(filter = {}, options = {}) {
    try {
      const page = parseInt(options.page) || 1;
      const limit = parseInt(options.limit) || 10;
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.repository.findAll(filter, {
          ...options,
          skip,
          limit,
        }),
        this.repository.count(filter),
      ]);

      return {
        data,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get entity by ID
   * @param {string} id - Entity ID
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Entity or null
   */
  async getById(id, options = {}) {
    try {
      const entity = await this.repository.findById(id, options);
      if (!entity) {
        const error = new Error('Resource not found');
        error.statusCode = 404;
        throw error;
      }
      return entity;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get entity by filter
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Entity or null
   */
  async getOne(filter, options = {}) {
    try {
      return await this.repository.findOne(filter, options);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update entity by ID
   * @param {string} id - Entity ID
   * @param {Object} data - Data to update
   * @param {Object} options - Update options
   * @returns {Promise<Object|null>} Updated entity or null
   */
  async updateById(id, data, options = {}) {
    try {
      const entity = await this.repository.updateById(id, data, options);
      if (!entity) {
        const error = new Error('Resource not found');
        error.statusCode = 404;
        throw error;
      }
      return entity;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete entity by ID
   * @param {string} id - Entity ID
   * @returns {Promise<Object|null>} Deleted entity or null
   */
  async deleteById(id) {
    try {
      const entity = await this.repository.deleteById(id);
      if (!entity) {
        const error = new Error("Resource not found");
        error.statusCode = 404;
        throw error;
      }
      return entity;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if entity exists
   * @param {Object} filter - Filter criteria
   * @returns {Promise<boolean>} True if exists, false otherwise
   */
  async exists(filter) {
    try {
      return await this.repository.exists(filter);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Count entities matching filter
   * @param {Object} filter - Filter criteria
   * @returns {Promise<number>} Count of entities
   */
  async count(filter = {}) {
    try {
      return await this.repository.count(filter);
    } catch (error) {
      throw error;
    }
  }
}

export default BaseService;
