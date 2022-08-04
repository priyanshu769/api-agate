const router = require('express').Router()

// Models
const Order = require('../models/order.model')
const Product = require('../models/product.model')

// Middlewares
const verifyLoggedInUser = require('../middlewares/verifyLoggedInUser.middleware')

router.use(verifyLoggedInUser)
router
    .route('/')
    .get(async (req, res) => {
        const userId = req.userId
        try {
            const orders = await Order.find({ owner: userId })
            res.json({ success: true, orders })
        } catch (error) {
            res.json({
                success: false,
                message: 'Unable to fetch your orders.',
                errorMessage: error.message,
            })
        }
    })
    .post(async (req, res) => {
        const orderedProducts = req.body.orderedProducts
        const userId = req.userId
        const newOrder = { products: orderedProducts, owner: userId }
        try {
            const verifyNeworder = new Order(newOrder)
            const savedOrder = await verifyNeworder.save()
            res.json({ success: true, savedOrder })
        } catch (error) {
            res.json({
                success: true,
                message: 'Unable to complete order.',
                errorMessage: error.message,
            })
        }
    })

module.exports = router