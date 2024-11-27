const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductSchema = new Schema({
    productName: {
        type: String,
        unique: true,
        maxlength: 20,
        default: null
    },
    manufacturer: {
        type: String,
        maxlength: 20,
        default: null
    },
    manufactureDate: {
        type: Date,
        default: null
    },
    expiryDate: {
        type: Date,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true // Ensure sellerId is required
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Product', ProductSchema);
