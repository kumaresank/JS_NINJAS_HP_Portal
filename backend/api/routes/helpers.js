const { z } = require('zod');

// Schema to validate if the passoword is strong or not
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character (@$!%*?&#)");


class HttpError extends Error {
  payload

  constructor(payload) {
    super(payload.message)
    this.payload = payload
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

module.exports = {
  passwordSchema,
  HttpError,
  errorToHttpErrorPayload
}
