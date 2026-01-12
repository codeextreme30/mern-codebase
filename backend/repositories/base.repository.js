/**
 * Base Repository Class
 * Provides common CRUD operations for all repositories
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Create a new document
   * @param {Object} data - Data to create
   * @returns {Promise<Object>} Created document
   */
  async create(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find all documents with optional filters
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Query options (select, sort, limit, skip)
   * @returns {Promise<Array>} Array of documents
   */
  async findAll(filter = {}, options = {}) {
    try {
      let query = this.model.find(filter);

      if (options.select) {
        query = query.select(options.select);
      }

      if (options.sort) {
        query = query.sort(options.sort);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.skip) {
        query = query.skip(options.skip);
      }

      return await query.exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a single document by ID
   * @param {string} id - Document ID
   * @param {Object} options - Query options (select, populate)
   * @returns {Promise<Object|null>} Document or null
   */
  async findById(id, options = {}) {
    try {
      let query = this.model.findById(id);

      if (options.select) {
        query = query.select(options.select);
      }

      if (options.populate) {
        query = query.populate(options.populate);
      }

      return await query.exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find a single document by filter
   * @param {Object} filter - Filter criteria
   * @param {Object} options - Query options (select, populate)
   * @returns {Promise<Object|null>} Document or null
   */
  async findOne(filter, options = {}) {
    try {
      let query = this.model.findOne(filter);

      if (options.select) {
        query = query.select(options.select);
      }

      if (options.populate) {
        query = query.populate(options.populate);
      }

      return await query.exec();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a document by ID
   * @param {string} id - Document ID
   * @param {Object} data - Data to update
   * @param {Object} options - Update options
   * @returns {Promise<Object|null>} Updated document or null
   */
  async updateById(id, data, options = {}) {
    try {
      const updateOptions = {
        new: options.new !== undefined ? options.new : true,
        runValidators: options.runValidators !== undefined ? options.runValidators : true,
      };

      return await this.model.findByIdAndUpdate(id, data, updateOptions);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a document by ID
   * @param {string} id - Document ID
   * @returns {Promise<Object|null>} Deleted document or null
   */
  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Count documents matching filter
   * @param {Object} filter - Filter criteria
   * @returns {Promise<number>} Count of documents
   */
  async count(filter = {}) {
    try {
      return await this.model.countDocuments(filter);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if document exists
   * @param {Object} filter - Filter criteria
   * @returns {Promise<boolean>} True if exists, false otherwise
   */
  async exists(filter) {
    try {
      const count = await this.model.countDocuments(filter);
      return count > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseRepository;
