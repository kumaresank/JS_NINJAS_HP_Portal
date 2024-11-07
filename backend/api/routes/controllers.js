const UserModel = require("../models/User");
const { HttpError } = require("./helpers");


// Utility
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

/* Signup a new user */
const signupController = async (req, res, next) => {
  // Read inputs
  const { firstName, lastName, email, password } = req.data;

  // Check if a user with this email already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new HttpError({
      status: 400, code: "bad_request", message: "A user with this email already exists."
    });
  }

  // Create a new user if no existing user is found
  const user = new UserModel({ firstName, lastName, email, password });
  await user.save();

  return res.status(201).json(userDataToSend(user));
};


/* Login an existing user */
const loginController = async (req, res, next) => {
  // Read inputs
  const { email, password } = req.data;
  
  const user = await UserModel.findOne({email});
  if(!user || !(await user.comparePassword(password))) {
    throw new HttpError({
      status: 400,
      code: "bad_request",
      message: "Invalid credentials",
    })
  } 
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
  return res.status(200).json({ token, ...userDataToSend(user) });
}

module.exports = {
  signupController,
  loginController
};
