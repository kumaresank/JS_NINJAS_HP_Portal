const UserModel = require("../models/User");
const SlotModel = require("../models/Slot");
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

/* Fetch the list of all doctors */
const fetchDoctorsController = async (req, res, next) => {
  // Read inputs
  const user = req.user;

  // TODO: Do we need to add pagination? Assuming total expected doctors count is not high for now, so ignore 
  let doctors = await UserModel.find({ role: 'doctor' });
  doctors = doctors.map((x) => userDataToSend(x))

  return res.status(200).json({doctors});
}

/* Add a new slot for the doctor */
const addSlotController = async (req, res, next) => {
  // Read inputs
  const {doctorId, date, slots} = req.data;

  const doctor = await UserModel.findOne({ _id: doctorId });
  if (doctor) {
    throw new HttpError({
      status: 400, code: "bad_request", message: "No such doctor found"
    });
  }

  // All slots for the current date are overwritten
  const slotDocument = await SlotModel.findOneAndUpdate(
    { doctorId, date },
    { doctorId, date, slots },
    { upsert: true, new: true }
  );
  await slotDocument.save();
  return res.status(200).json({slot: slotDocument});
}


/* Add a new slot for the doctor */
const getSlotsController = async (req, res, next) => {
  // Read inputs
  const {doctorId, date} = req.data;

  const data = await SlotModel.find({ 
    doctorId: doctorId,
    date: date
   });
  return res.status(200).json(data);
}


module.exports = {
  signupController,
  loginController,
  profileController,
  fetchDoctorsController,
  addSlotController,
  getSlotsController
};
