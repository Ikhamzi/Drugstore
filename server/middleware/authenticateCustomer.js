const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer'); // Import the Customer model

const JWT_SECRET = 'AuthorisationToken';

const authenticateToken = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        console.log('No token provided');
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.customer = await Customer.findById(verified.customer.id).select('-password');
        if (!req.customer) {
            return res.status(404).send('Customer not found');
        }
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(400).send('Invalid Token');
    }

};

module.exports = authenticateToken;