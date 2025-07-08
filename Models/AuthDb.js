const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    }
    ,
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    age : {
        type: Number,
        required: true,
        trim: true
    },
    gender : {
        type: String,
        required: true,
        trim: true
    },
    phone : {
        type: Number,
        required: true,
        trim: true
    },
    address : {
        type: String,
        required: true,
        trim: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth