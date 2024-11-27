const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product'); // Assuming the product schema is defined in this file
const authenticateSeller = require('../middleware/authenticateSeller'); // Import the existing middleware

// Route to add a new product
router.post('/',
    authenticateSeller,
    [
        body('productName').optional().isLength({ max: 20 }).withMessage('Product Name must be at most 20 characters long'),
        body('manufacturer').optional().isLength({ max: 20 }).withMessage('Manufacturer must be at most 20 characters long'),
        body('manufactureDate').optional().isDate().withMessage('Manufacture Date must be a valid date'),
        body('expiryDate').optional().isDate().withMessage('Expiry Date must be a valid date'),
        body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Ensure sellerId is available from the authenticated seller (via middleware)
        const sellerId = req.seller._id;

        if (!sellerId) {
            return res.status(400).json({ message: 'Seller ID is required' });
        }

        const { productName, manufacturer, manufactureDate, expiryDate, price } = req.body;

        try {
            // Create a new product instance
            const newProduct = new Product({
                productName,
                manufacturer,
                manufactureDate,
                expiryDate,
                price,
                sellerId // Store sellerId in the product document
            });

            // Save the product to the database
            const savedProduct = await newProduct.save();

            res.status(201).json(savedProduct); // Return the saved product
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
);

module.exports = router;
