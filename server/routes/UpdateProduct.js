const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/AuthenticateUser');
const Product = require('../models/Product');

router.put('/:id', authenticateUser, async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        // Ensure the user is authorized to update the product
        if (req.userType !== 'seller') {
            return res.status(403).send('Unauthorized user.');
        }

        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!product) {
            return res.status(404).send('Product not found.');
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;