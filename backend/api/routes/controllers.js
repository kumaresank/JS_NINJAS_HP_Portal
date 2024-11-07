const UserModel = require("../models/User")


/* Signup a new user */
const signupController = async (req, res, next) => {
  // Read validated inputs
  const { firstName, lastName, email, password } = req.data

  const user = new UserModel({ firstName, lastName, email, password });
  await user.save();
  return res.status(201).json({ message: 'User created' });
}


/* Login an existing user */
const loginController = async (req, res, next) => {
  // Read validated inputs
  const { email, password } = req.data;
  
  const user = await UserModel.findOne({email});
  if(!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials"});
  } 
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
  return res.status(200).json({ token, userId: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role });
}

module.exports = {
  signupController,
  loginController
};
