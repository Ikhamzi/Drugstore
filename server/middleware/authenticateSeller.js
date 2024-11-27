const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller'); // Import the Seller model

const JWT_SECRET = 'AuthorisationToken';

const authenticateToken = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        console.log('No token provided');
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.seller = await Seller.findById(verified.seller.id).select('-password');
        if (!req.seller) {
            return res.status(404).send('Seller not found');
        }
        req.userType = 'seller';
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(400).send('Invalid Token');
    }
};

module.exports = authenticateToken;