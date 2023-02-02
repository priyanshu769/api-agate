const mongoose = require("mongoose")

const OrderedProductObj = new mongoose.Schema({
    orderedProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: 'cannot complete order without product id'
    },
    quantity: {
        type: Number,
        required: 'cannot add product without quantity'
    }
})

const OrderSchema = new mongoose.Schema({
    products: [OrderedProductObj],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})
const Order = mongoose.model("Order", OrderSchema)

module.exports = Order