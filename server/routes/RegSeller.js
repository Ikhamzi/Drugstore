const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult, body } = require('express-validator'); // Added body import
const Seller = require('../models/Seller'); // Corrected path to the model

// @route   POST api/registerseller
// @desc    Register seller
// @access  Public

router.post(
  '/',
  [
    body('sellerName').isLength({ min: 3 }).withMessage('Seller name must be at least 3 chars long'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
    body('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 chars long'),
    body('address').isLength({ min: 10 }).withMessage('Address must be at least 10 chars long')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sellerName, email, password, address, phoneNumber } = req.body;

    try {
      let seller = await Seller.findOne({ email: req.body.email });
      if (seller) {
        return res.status(400).json({ msg: 'Seller already exists' });
      }

      seller = new Seller({
        sellerName,
        email,
        password,
        address,
        phoneNumber
      });

      const salt = await bcrypt.genSalt(10);
      seller.password = await bcrypt.hash(password, salt);

      await seller.save();

      res.status(201).json(seller);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;