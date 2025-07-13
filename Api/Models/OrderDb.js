const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  items: [
    {
      productId: {
        type: String,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      productPrice: {
        type: Number,
        required: true
      },
      productImage: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const OrderDb = mongoose.model('Order', OrderSchema);
module.exports = OrderDb;
