const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define the Orders Schema
const OrdersSchema = new Schema({
    oid: {
        type: Number,
        required: false,
        unique: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        maxlength: 15,
        ref: 'Product' // Reference to Product collection
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        required: true,
        maxlength: 15,
        ref: 'Product' // Reference to Seller collection
    },
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
        maxlength: 15,
        ref: 'Customer' // Reference to Customer collection
    },
    orderDateTime: {
        type: Date,
        default: Date.now // Set the current date-time as default
    },
    quantity: {
        type: Number,
        required: true,
        min: 0, // Ensures quantity is non-negative (unsigned in SQL)
        default: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Ensures price is non-negative (unsigned in SQL)
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create an index for the composite key (pid, sid, uid) if needed for uniqueness or optimization
OrdersSchema.index({ productId: 1, sellerId: 1, customerId: 1 }, { unique: true });

OrdersSchema.plugin(AutoIncrement, { inc_field: 'oid' });

// Export the Order model
module.exports = mongoose.model('Orders', OrdersSchema);
