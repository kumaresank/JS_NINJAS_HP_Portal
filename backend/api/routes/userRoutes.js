const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if(!user) return res.status(404).json({ message: "User not found" });

  return res.json({ userId: req.user.userId, firstName: user.firstName, lastName: user.lastName, role: user.role });
});

module.exports = router;
