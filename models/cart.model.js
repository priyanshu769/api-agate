const mongoose = require('mongoose')

const CartProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    require: "Cannot add product without product id."
  },
  quantity: {
    type: Number,
    default: 1,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const CartProduct = mongoose.model('CartProduct', CartProductSchema)
module.exports = CartProduct
