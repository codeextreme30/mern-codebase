import ApiResponse from '../utils/response.js';
import UserService from '../services/user.service.js';

const userService = new UserService();

/**
 * Get all users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await userService.getAll({}, { page, limit });
    return ApiResponse.success(res, result, 'Users retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    return ApiResponse.success(res, user, 'User retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new user
 */
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    return ApiResponse.success(res, user, 'User created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.updateById(id, req.body);
    return ApiResponse.success(res, user, 'User updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteById(id);
    return ApiResponse.success(res, null, 'User deleted successfully', 200);
  } catch (error) {
    next(error);
  }
};
