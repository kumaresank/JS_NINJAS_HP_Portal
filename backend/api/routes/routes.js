const express = require('express');
const { asyncHttpErrorWrapper, combineParamsAndBodyData, attachUser } = require("./middleware");
const { signupSchema, loginSchema, doctorsSchema } = require('./schema');
const { signupController, loginController, fetchDoctorsController } = require('./controllers');

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

// Login existing user
router.get('/doctors', 
  asyncHttpErrorWrapper(attachUser),
  asyncHttpErrorWrapper(combineParamsAndBodyData(doctorsSchema)), 
  asyncHttpErrorWrapper(fetchDoctorsController)
);


module.exports = router;
