const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Inventory Schema
const InventorySchema = new Schema({
    productId: {
        type: String,
        required: true,
        maxlength: 15,
        ref: 'Product'  // Reference to Product collection
    },
    productName: {
        type: String,
        maxlength: 20,
        ref: 'Product'  // Reference to Product collection
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,  // Ensures quantity is non-negative (unsigned in SQL)
        default: 0
    },
    sellerId: {
        type: String,
        required: true,
        maxlength: 15,
        ref: 'Seller'  // Reference to Seller collection
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create a compound index for the composite primary key (pid, sid)
InventorySchema.index({ productId: 1, sellerId: 1 }, { unique: true });

// Export the Inventory model
module.exports = mongoose.model('Inventory', InventorySchema);
