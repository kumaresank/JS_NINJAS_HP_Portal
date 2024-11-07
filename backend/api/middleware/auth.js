const jwt = require('jsonwebtoken');

require('dotenv').config();

function auth(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Auth Error' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).send({ message: 'Invalid Token' });
    }
}

module.exports = auth;