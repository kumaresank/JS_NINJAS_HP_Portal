const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async(req,res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ firstName, lastName, email, password });
        await user.save();
        return res.status(201).json({ message: 'User created' });
    } catch (error) {
        return res.status(400).json({ message: 'User registration failed' });
    }
});

router.post('/login', async(req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials"});
        } 
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.status(200).json({ token, userId: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role });
    } catch (error) {
        return res.status(400).json({ message: 'Login failed' });
    }
});

module.exports = router;