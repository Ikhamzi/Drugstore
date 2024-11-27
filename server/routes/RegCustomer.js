const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const Customer = require('../models/Customer');

const JWT_SECRET = 'AuthorisationToken'; 
router.post('/', [
    body('userId').isLength({ min: 3 }).withMessage('User ID must be at least 3 chars long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
    body('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 chars long'),
    body('address').isLength({ min: 10 }).withMessage('Address must be at least 10 chars long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const existingCustomer = await Customer.findOne({ email: req.body.email });
        if (existingCustomer) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const customer = await Customer.create({
            userId: req.body.userId,
            email: req.body.email,
            password: secPass,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        });

        const payload = {
            customer: {
                id: customer._id // Ensure correct customer ID
            }
        };
        const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ customer, authToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;