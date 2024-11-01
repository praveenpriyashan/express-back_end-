const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'             // reference User schema
    },
    products: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
            price: Number
        }
    ],
    totalPrice: Number,
    createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Order', OrderSchema);