const { z } = require('zod');

// Schema to validate if the passoword is strong or not
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)");


/**
 * Custom error class for handling HTTP errors with additional payload data.
 * Extends the built-in Error class to include structured error information
 * that can be used in an API response.
 */
class HttpError extends Error {
  /**
   * @typedef {Object} HttpErrorPayload
   * @property {number} status - HTTP status code (e.g., 400).
   * @property {HttpBusinessErrorCode} code - Business-specific error code.
   * @property {string} message - User-friendly error message to display.
   * @property {Object} [data] - Optional additional data related to the error.
   */

  /**
   * @typedef {'bad_request'} HttpBusinessErrorCode
   */

  /**
   * @type {HttpErrorPayload}
   */
  payload;
  
  /**
   * Creates an instance of HttpError.
   * @param {HttpErrorPayload} payload - The error payload containing status, code, message, and optional data.
   */
  constructor(payload) {
    super(payload.message);
    this.payload = payload;
  }
}
  
const errorToHttpErrorPayload = (error) => {
  // In javascript you can throw anything and not just Error class object
  if (error instanceof HttpError) {
    return error.payload
  }
  else if (error instanceof Error) {
    const message = process.env.DEV === '1'? error.message: "Something went wrong!"
    const stackTrace = process.env.DEV === '1'? error.stack: undefined
    const paylod = {
      status: 500,
      code: 'server_error',
      message, stackTrace 
    }
    return paylod
  }
  else {
    const message = process.env.DEV === '1'? error.message: "Something went wrong!"
    const stackTrace = process.env.DEV === '1'? (typeof error === "string" ? error : JSON.stringify(error)) : undefined
    const paylod = {
      status: 500,
      code: 'server_error',
      message, stackTrace 
    }
    return paylod
  }
}

const userDataToSend = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
  }
}

module.exports = {
  passwordSchema,
  HttpError,
  errorToHttpErrorPayload,
  userDataToSend
}
