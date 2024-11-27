const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    sellerName: {
        type: String,
        maxlength: 20,
        default: null
    },
    email: {
        type: String,
        maxlength: 30,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    address: {
        type: String,
        maxlength: 128,
        default: null
    },
    phoneNumber: {
        type: Number,
        default: null
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Seller', SellerSchema);
