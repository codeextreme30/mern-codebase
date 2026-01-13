/**
 * Unified API Response Handler
 */
class ApiResponse {
  /**
   * Success Response
   * @param {Object} res - Express response object
   * @param {*} data - Response data
   * @param {string} message - Success message
   * @param {number} statusCode - HTTP status code (default: 200)
   */
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
      status: statusCode,
    });
  }

  /**
   * Error Response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {*} errors - Additional error details
   */
  static error(res, message = 'Internal Server Error', statusCode = 500, errors = null) {
    const response = {
      success: false,
      data: null,
      message,
      status: statusCode,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Validation Error Response
   * @param {Object} res - Express response object
   * @param {*} errors - Validation errors
   * @param {string} message - Error message
   */
  static validationError(res, errors, message = 'Validation Error') {
    return res.status(400).json({
      success: false,
      data: null,
      message,
      status: 400,
      errors,
    });
  }

  /**
   * Not Found Response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static notFound(res, message = 'Resource not found') {
    return res.status(404).json({
      success: false,
      data: null,
      message,
      status: 404,
    });
  }

  /**
   * Unauthorized Response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static unauthorized(res, message = 'Unauthorized') {
    return res.status(401).json({
      success: false,
      data: null,
      message,
      status: 401,
    });
  }

  /**
   * Forbidden Response
   * @param {Object} res - Express response object
   * @param {string} message - Error message
   */
  static forbidden(res, message = 'Forbidden') {
    return res.status(403).json({
      success: false,
      data: null,
      message,
      status: 403,
    });
  }
}

export default ApiResponse;
