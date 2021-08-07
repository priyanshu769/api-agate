const express = require('express')
const router = express.Router()
const { extend } = require('lodash')

// Model
const User = require('../models/user.model.js')

// Middlewares
const verifyLoggedInUser = require('../middlewares/verifyLoggedInUser.middleware')

router.use(verifyLoggedInUser)

router.route('/').get(async (req, res) => {
  const { userId } = req
  try {
    const user = await User.findById(userId).populate('wishlist').exec()
    const { __v, password, ...restUserData } = user._doc
    res.json({ success: true, user: restUserData })
  } catch (error) {
    res.json({
      success: false,
      message: 'User fetch failed',
      errorMessage: error.message,
    })
  }
})
router.route('/wishlistProduct').post(async (req, res) => {
  const userId = req.userId
  const { productId } = req.body
  try {
    const user = await User.findById(userId)
    if (user.wishlist.includes(productId)) {
      await user.updateOne({ $pull: { wishlist: productId } })
      res.json({ success: true, message: 'Product removed from wishlist.' })
    } else await user.updateOne({ $push: { wishlist: productId } })
    res.json({ success: true, message: 'Product added to wishlist.' })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to add product to your wishlist.',
      errorMessage: error.message,
    })
  }
})

module.exports = router
