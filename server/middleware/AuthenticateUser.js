const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Seller = require('../models/Seller');

const JWT_SECRET = 'AuthorisationToken';

const authenticateUser = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        if (verified.customer) {
            req.user = await Customer.findById(verified.customer.id).select('-password');
            req.userType = 'customer';
        } else if (verified.seller) {
            req.user = await Seller.findById(verified.seller.id).select('-password');
            req.userType = 'seller';
        }

        if (!req.user) {
            return res.status(404).send('User not found');
        }
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(400).send('Invalid Token');
    }
};

module.exports = authenticateUser;