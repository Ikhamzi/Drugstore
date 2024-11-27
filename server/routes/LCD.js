const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Adjust the path as necessary
const authenticateToken = require('../middleware/authenticateCustomer'); // Ensure Customer is imported in AuthenticateUser

// Route to get user data
router.post('/', authenticateToken, async (req, res) => {
    try {
        const customer = await Customer.findById(req.customer.id).select('-password');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// try {
//     if (!req.customer) {
//         return res.status(400).send('Customer not found');
//     }
//     const userId = req.customer.id; // Using the correct customer ID
//     const user = await Customer.findById(userId).select('-password');
//     if (!user) {
//         return res.status(404).send('Customer not found');
//     }
//     console.log('Customer data:', user); // Log user data
//     res.json(user);
// } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
// }
// });

module.exports = router;