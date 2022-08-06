const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot enter a product without name"
  },
  image: {
    type: String,
    required: "Image required"
  },
  price: {
    type: Number,
    required: "Price required"
  },
  description: {
    type: String,
    minLength: 150
  },
  stock: {
    type: Boolean,
    required: "Stock quantity required"
  },
  buyLink: {
    type: String,
  },
  fastDelivery: {
    type: Boolean,
    required: "Delivery type required"
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5
  },
  category: {
    type: String,
    required: "Category is Required. Specify Head/Body/Legs/Others"
  }
},{
    timestamps: true
  })
const Product = mongoose.model("Product", ProductSchema)

module.exports = Product