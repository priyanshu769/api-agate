const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name requried"
  },
  username: {
    type: String,
    required: "Username required",
    unique: true
  },
  email: {
    type: String,
    required: "Email required",
    unique: true
  },
  password: {
      type: String,
      required: "Password required",
  },
  cart: {
      type: Array
  },
  wishlist: {
      type: Array
  }
},{
    timestamps: true
  })
const User = mongoose.model("User", UserSchema)

module.exports = {User}