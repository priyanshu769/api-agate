const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findOne } = require('../models/user.model')
require('dotenv').config()
const secretKey = process.env.SECRET

// Model
const User = require('../models/user.model')

router.route('/').post(async (req, res) => {
  const newUser = req.body
  try {
    const verifyNewUser = new User(newUser)
    const userWithEmail = await User.findOne({ email: verifyNewUser.email })
    if (userWithEmail) {
      return res.json({
        success: false,
        message: 'User with this email already exist, try logging in.',
      })
    }
    try {
      const salt = await bcrypt.genSalt(10)
      verifyNewUser.password = await bcrypt.hash(verifyNewUser.password, salt)
      const userSaved = await verifyNewUser.save()
      const token = jwt.sign({ userId: userSaved._id }, secretKey)
      const { password, __v, ...restUserData } = userSaved._doc
      res.json({ success: false, user: restUserData, token })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to signup.',
        errorMessage: error.message,
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: 'Signup unsuccessful!',
      errorMessage: error.message,
    })
  }
})

module.exports = router
