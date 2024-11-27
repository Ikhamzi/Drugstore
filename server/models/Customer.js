const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    password: {
        type: String,
        default: null
    },
    firstName: {
        type: String,
        maxlength: 15,
        default: null
    },
    lastName: {
        type: String,
        maxlength: 15,
        default: null
    },
    email: {
        type: String,
        maxlength: 30,
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

module.exports = mongoose.model('Customer', CustomerSchema);
