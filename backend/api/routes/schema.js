const { z } = require('zod');
const { passwordSchema } = require('./helpers');

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  firstName: z.string().min(2, "First name must be longer than 1 character"),
  lastName: z.string().min(2, "First name must be longer than 1 character"),
  password: passwordSchema,
  role: z.enum(['patient', 'doctor', 'admin']).default('patient'),
});


const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

const profileSchema = z.any();  // No input needed

const doctorsSchema = z.any();  // No input needed

const addSlotSchema = z.object({
  doctorId: z.string(),
  // TODO: We should make sire slots[i].from and slots[i].to dates are same as date here
  date: z.string(),
  slots: z.array(
    z.object({
      from: z.string(),
      to: z.string()
    })
  )
});

const getSlotsSchema = z.object({
  doctorId: z.string(),
  date: z.string(),
});


module.exports = {
  signupSchema,
  loginSchema,
  profileSchema,
  doctorsSchema,
  addSlotSchema,
  getSlotsSchema
}