const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');
const { HttpError, userDataToSend } = require("./helpers");


/* Signup a new user */
const signupController = async (req, res, next) => {
  // Read inputs
  const userData = req.data;

  // Check if a user with this email already exists
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new HttpError({
      status: 400, code: "bad_request", message: "A user with this email already exists."
    });
  }

  // Create a new user if no existing user is found
  const user = new UserModel(userData);
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

/* Profile for logged in user */
const profileController = async (req, res, next) => {
    // Read inputs
    const user = req.user;

    return res.status(200).json(user);
}

/* Login an existing user */
const fetchDoctorsController = async (req, res, next) => {
  // Read inputs
  const user = req.user;

  // TODO: Do we need to add pagination? Assuming total expected doctors count is not high for now, so ignore 
  let doctors = await UserModel.find({ role: 'doctor' });
  doctors = doctors.map((x) => userDataToSend(x))

  return res.status(200).json({doctors});
}


module.exports = {
  signupController,
  loginController,
  profileController,
  fetchDoctorsController
};
