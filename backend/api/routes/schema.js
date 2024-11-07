const { z } = require('zod');
const { passwordSchema } = require('./helpers');

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(2, "First name must be longer than 1 character"),
  lastName: z.string().min(2, "First name must be longer than 1 character"),
  password: passwordSchema
});


const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});


const doctorsSchema = z.any();  // No input needed

module.exports = {
  signupSchema,
  loginSchema,
  doctorsSchema
}