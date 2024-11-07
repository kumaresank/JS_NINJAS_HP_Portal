const express = require('express');
const { asyncHttpErrorWrapper, combineParamsAndBodyData } = require("./middleware");
const { signupSchema, loginSchema } = require('./schema');
const { signupController, loginController } = require('./controllers');

const router = express.Router();


// Signup a new user
router.post('/auth/register', 
  asyncHttpErrorWrapper(combineParamsAndBodyData(signupSchema)), 
  asyncHttpErrorWrapper(signupController)
);

// Login existing user
router.post('/auth/login', 
  asyncHttpErrorWrapper(combineParamsAndBodyData(loginSchema)), 
  asyncHttpErrorWrapper(asyncHttpErrorWrapper(loginController))
);

module.exports = router;
