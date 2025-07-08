const mongosse = require('mongoose');
const Schema = mongosse.Schema;

const ProductSchema = new Schema({
    productId:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    productName:{
        type: String,
        required: true,
        trim: true
    },
    productPrice:{
        type: Number,
        required: true,
        trim: true
    },
    productDescription:{
        type: String,
        required: true,
        trim: true
    },
    productBrand:{
        type: String,
        required: true,
        trim: true
    },
    productCategory:{
        type: String,
        required: true,
        trim: true
    },
    imageUrl:{
        type: String,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
const Product = mongosse.model('Product', ProductSchema);
module.exports = Product;