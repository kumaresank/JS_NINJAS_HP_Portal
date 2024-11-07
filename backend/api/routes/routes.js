const express = require('express');
const { asyncHttpErrorWrapper, combineParamsAndBodyData, auth } = require("./middleware");
const { signupSchema, loginSchema } = require('./../validation/schema');
const { signupController, loginController, profileController } = require('./controllers');

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

// Profile for loggedin user
router.get('/user/profile', 
    auth,
    asyncHttpErrorWrapper(profileController)
  );

module.exports = router;