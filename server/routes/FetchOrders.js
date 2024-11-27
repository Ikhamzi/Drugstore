const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/AuthenticateUser');
const Order = require('../models/Orders');

router.get('/', authenticateUser, async (req, res) => {
    try {
        let orders;
        if (req.userType === 'customer') {
            console.log('Fetching orders for customer ID:', req.user._id);
            orders = await Order.find({ customerId: req.user._id })
            .populate('productId').
            populate({
                path: 'customerId',
                select: 'phoneNumber address' // Select only phoneNumber and address
            });
        } else if (req.userType === 'seller') {
            console.log('Fetching orders for seller ID:', req.user._id);
            orders = await Order.find({ sellerId: req.user._id })
            .populate('productId').
            populate({
                path: 'sellerId',
                select: 'phoneNumber address'
            });
        } else {
            return res.status(400).send('Invalid user type.');
        }

        if (!orders || orders.length === 0) {
            return res.status(404).send('No orders found for this user.');
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;