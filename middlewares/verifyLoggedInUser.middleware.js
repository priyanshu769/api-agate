const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET

const verifyLoggedInUser = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.json({ success: false, message: 'Invalid Token' })
  }
  try {
    const decode = jwt.verify(token, secretKey)
    req.userId = decode.userId
    return next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Unale to decode token',
      errorMessage: error.message,
    })
  }
}

module.exports = verifyLoggedInUser