const { z } = require('zod');
const { passwordSchema } = require('./helpers');

// signup endpoint schema
const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(2, "First name must be longer than 1 character"),
  lastName: z.string().min(2, "First name must be longer than 1 character"),
  password: passwordSchema
});


// login endpoint schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

module.exports = {
  signupSchema,
  loginSchema
}