const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose'); // For ObjectId validation
const authenticateUser = require('../middleware/authenticateCustomer');
const Order = require('../models/Orders');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

const router = express.Router();

router.post('', [
    authenticateUser,
    check('productId').isMongoId().withMessage('Valid Product ID is required'), // Validate productId as Mongo ObjectId
    check('customerName').not().isEmpty().withMessage('Customer name is required'),
    check('quantity').isInt({ gt: 0, lt: 11 }).withMessage('Quantity must be a positive integer')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { productId, customerName, quantity } = req.body; 
    const customerId = req.customer._id; // Get the customerId from the authenticated customer

    try {
        // Retrieve the product by productId
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Create a new order
        const newOrder = new Order({
            productId,
            customerName,
            quantity,
            sellerId: product.sellerId, // Automatically set sellerId from the product
            customerId,
            orderDateTime: new Date(), // Use the current date and time
            price: product.price * quantity // Calculate the total price based on quantity
        });

        // Save the order
        const order = await newOrder.save();
        res.status(201).json(order); // Return the saved order
    } catch (err) {
        console.error('Error placing order:', err); // Log the error
        res.status(500).json({ error: 'Failed to place order. Please try again later.' });
    }
});

module.exports = router;
