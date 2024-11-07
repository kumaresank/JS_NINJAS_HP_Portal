const express = require('express');
const { asyncHttpErrorWrapper, combineParamsAndBodyData, attachUser, checkRole } = require("./middleware");
const { signupSchema, loginSchema, profileSchema, doctorsSchema, addSlotSchema, getSlotsSchema} = require('./schema');
const { signupController, loginController, profileController, fetchDoctorsController, addSlotController, getSlotsController } = require('./controllers');

const router = express.Router();


// Signup a new user
// We are letting new doctors/admins also register by signing role in signup route. Not sure if this is the right thing to do`
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


// List of doctors
router.post('/slots/add',
  asyncHttpErrorWrapper(attachUser),
  asyncHttpErrorWrapper(checkRole(["admin"])),
  asyncHttpErrorWrapper(combineParamsAndBodyData(addSlotSchema)),
  asyncHttpErrorWrapper(addSlotController)
);

// List of doctors
router.post('/slots/',
  asyncHttpErrorWrapper(attachUser),
  asyncHttpErrorWrapper(combineParamsAndBodyData(getSlotsSchema)),
  asyncHttpErrorWrapper(getSlotsController)
);

module.exports = router;
