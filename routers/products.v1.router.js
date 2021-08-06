const express = require("express")
const router = express.Router()
const { extend } = require("lodash")

// Model
const Product = require("../models/product.model.js")

router.route("/")
  .get(async (req, res) => {
 try {
   const products = await Product.find({})
   res.json({success: true, products})
 } catch(error){
   res.json({success: false, message: "Product fetch failed", errorMessage: error.message})
 }
})
  .post(async (req, res) => {
  const saveProd = req.body
  try{
    const prodToSave = new Product(saveProd)
    const prodSaved = await prodToSave.save()
    res.json({status: true, prodSaved})
  } catch (err) {
    res.json({success: false, message: "product not saved", errorMessage: err.message})
  }
})

router.param("id", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ success: false, message: "error getting product" })
    }

    req.product = product
    next()
  } catch (error) {
    res.status(400).json({ success: false, message: "error while retrieving product" })
  }
})

router.route("/:id")
  .get((req, res) => {
    let {product} = req
    product.__v = undefined
    res.json({ success: true, product })
  })
  .post(async (req, res) => {
    const updateProduct = req.body;
    let { product } = req;


    product = extend(product, updateProduct)
    product = await product.save()

    res.json({ status: true, product })
  })
  .delete(async (req, res)=> {
    let {product} = req

    await product.remove()

    product.deleted = true;

    res.json({success: true, product})
  })
module.exports = router