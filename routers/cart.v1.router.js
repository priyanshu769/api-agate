const router = require('express').Router()

// Models
const CartProduct = require('../models/cart.model')
const Product = require('../models/product.model')

// Middlewares
const verifyLoggedInUser = require('../middlewares/verifyLoggedInUser.middleware')

router.use(verifyLoggedInUser)
router
  .route('/')
  .get(async (req, res) => {
    const userId = req.userId
    try {
      const cartProducts = await CartProduct.find({ owner: userId }).populate("product").exec()
      res.json({ success: true, cartProducts })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to fetch your cart products.',
        errorMessage: error.message,
      })
    }
  })
router
  .route('/emptyCart')
  .post(async (req, res) => {
    const userId = req.userId
    try {
      const cartProducts = await CartProduct.find({ owner: userId })
      const emptyUserCart = cartProducts.forEach(async (cartProduct) => {
        const deleteProducts = await CartProduct.findOneAndDelete({
          owner: userId
        })
      })
      res.json({ success: true, cartProducts, emptyUserCart })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to fetch your cart products.',
        errorMessage: error.message,
      })
    }
  })
  .post(async (req, res) => {
    const product = req.body.productId
    const userId = req.userId
    const newCartProduct = { product: product, owner: userId }
    try {
      const verifyNewCartProduct = new CartProduct(newCartProduct)
      const savedCartProduct = await verifyNewCartProduct.save()
      res.json({ success: true, savedProduct: savedCartProduct })
    } catch (error) {
      res.json({
        success: true,
        message: 'Product Added to cart.',
        errorMessage: error.message,
      })
    }
  })
router.param('productId', async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId)
    if (!product) {
      res.json({ success: false, message: 'Unable to fetch your product.' })
    }
    next()
  } catch (error) {
    res.json({ success: false, errorMessage: error.message })
  }
})
router.route('/:productId/add').post(async (req, res) => {
  const userId = req.userId
  const newCartProduct = { product: req.params.productId, owner: userId }
  try {
    const verifyNewCartProduct = new CartProduct(newCartProduct)
    const savedCartProduct = await verifyNewCartProduct.save()
    res.json({ success: true, savedCartProduct })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to add product to cart',
      errorMessage: error.message,
    })
  }
})

router.param('cartProductId', async (req, res, next, cartProductId) => {
  try {
    const productInCart = await CartProduct.findById(cartProductId)
    if (productInCart && productInCart.owner == req.userId) {
      req.productInCart = productInCart
      next()
    } else
      res.json({
        success: false,
        message: 'Unable to fetch your product.',
      })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to find your product.',
      errorMessage: error.message,
    })
  }
})
router.route('/:cartProductId/remove').post(async (req, res) => {
  try {
    const removeCartProduct = await CartProduct.findOneAndDelete({
      _id: req.params.cartProductId,
    })
    res.json({ success: true, removeCartProduct })
  } catch (error) {
    res.json({ success: true, message: 'Product Added to cart.' })
  }
})
router.route('/:cartProductId/:type').post(async (req, res) => {
  const productInCart = req.productInCart
  try {
    if (req.params.type === 'increment') {
      const quantity = productInCart.quantity + 1
      const productUpdated = await CartProduct.findOneAndUpdate(
        {
          _id: req.params.cartProductId,
        },
        { quantity },
      )
      const updatedProduct = await CartProduct.findById(req.params.cartProductId)
      res.json({ success: true, updatedProduct })
    } else if (req.params.type === 'decrement') {
      const quantity = productInCart.quantity - 1
      const productUpdated = await CartProduct.findOneAndUpdate(
        {
          _id: req.params.cartProductId
        },
        { quantity },
      )
      const updatedProduct = await CartProduct.findById(req.params.cartProductId)
      res.json({ success: true, updatedProduct })
    }
  } catch (error) {
    res.json({ success: false, message: 'Unable to update quantity.', errorMessage: error.message })
  }
})

module.exports = router
