const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    productId: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true,
        trim: true
    },
    productImage: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    totalAmount: {
        type: Number,
        required: true,
        trim: true
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;