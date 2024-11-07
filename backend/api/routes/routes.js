const express = require('express');
const { asyncHttpErrorWrapper, combineParamsAndBodyData, attachUser } = require("./middleware");
const { signupSchema, loginSchema, profileSchema, doctorsSchema } = require('./schema');
const { signupController, loginController, profileController, fetchDoctorsController } = require('./controllers');

const router = express.Router();


// Signup a new user
router.post('/auth/register', 
  asyncHttpErrorWrapper(combineParamsAndBodyData(signupSchema)), 
  asyncHttpErrorWrapper(signupController)
);

// Login existing user
router.post('/auth/login', 
  asyncHttpErrorWrapper(combineParamsAndBodyData(loginSchema)), 
  asyncHttpErrorWrapper(loginController)
);

// Profile for logged in user
router.get('/user/profile',
    asyncHttpErrorWrapper(attachUser),
    asyncHttpErrorWrapper(combineParamsAndBodyData(profileSchema)), 
    asyncHttpErrorWrapper(profileController)
  );

// List of doctors
router.get('/doctors',
  asyncHttpErrorWrapper(attachUser),
  asyncHttpErrorWrapper(combineParamsAndBodyData(doctorsSchema)),
  asyncHttpErrorWrapper(fetchDoctorsController)
);


module.exports = router;
