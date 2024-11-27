const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Customer = require('../models/Customer'); // Corrected path to the model

const JWT_SECRET = "AuthorisationToken"; // Manually define your JWT secret key here

// @route   POST api/logcustomer
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find the customer by email
      let customer = await Customer.findOne({ email });
      if (!customer) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Create and sign a JWT token
      const payload = {
        customer: {
          id: customer.id // Ensure correct customer ID, or replace with another identifier if needed
        }
      };

      jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;