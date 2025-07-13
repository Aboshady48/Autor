const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,  // store the user's _id
        required: true,
        ref: 'Auth'
    },
    items: [
        {
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
                required: true
            },
            productImage: {
                type: String,
                required: true,
                trim: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
