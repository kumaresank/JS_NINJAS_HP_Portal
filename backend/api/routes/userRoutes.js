// routes/userRoutes.js
const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  res.json({ message: 'Welcome to the protected route!', userId: req.user.id });
});

module.exports = router;
