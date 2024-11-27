const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller'); // Adjust the path as necessary
const authenticateToken = require('../middleware/authenticateSeller'); // Ensure Customer is imported in AuthenticateUser

// Route to get user data
router.post('/', authenticateToken, async (req, res) => {
    try {
        const seller = await Seller.findById(req.seller.id).select('-password');
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.json(seller);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// try {
//     if (!req.seller) {
//         return res.status(400).send('Seller not found');
//     }
//     const userId = req.seller.id; // Using the correct customer ID
//     const user = await Seller.findById(userId).select('-password');
//     if (!user) {
//         return res.status(404).send('Seller not found');
//     }
//     console.log('Seller data:', user); // Log user data
//     res.json(user);
// } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
// }
// });

module.exports = router;