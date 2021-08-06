const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET

// Model
const User = require('../models/user.model')

router.route('/').post(async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      res.json({ success: false, message: 'No user found with this email.' })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (isPasswordCorrect) {
      const token = jwt.sign({ userId: user._id }, secretKey)
      const { password, __v, ...restUserData } = user._doc
      res.json({ success: true, user: restUserData, token })
    } else res.json({ success: false, message: 'Incorrect Password' })
  } catch (error) {
    res.json({ success: false, message: 'Unable to login', errorMessage: error.message })
  }
  res.json({ success: true })
})

module.exports = router
