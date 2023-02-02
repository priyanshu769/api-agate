const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Cannot create account without name.',
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: 'Cannot create account without a valid email.',
    },
    password: {
      type: String,
      required: 'Cannot create account without a valid password.',
      min: 6,
    },
    wishlist: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model('User', UserSchema)
module.exports = User
