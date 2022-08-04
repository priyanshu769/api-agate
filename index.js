const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())

app.use(cors())

// DB connect
const initializeDBConnect = require('./db/db.connect.js')
initializeDBConnect()

// Middlewares
const errorHandler404 = require('./middlewares/errorHandler404.middleware.js')
const errorHandler500 = require('./middlewares/errorHandler500.middleware.js')

// Routers
const products = require('./routers/products.v1.router')
const user = require('./routers/user.v1.router')
const login = require('./routers/login.router')
const signup = require('./routers/signup.router')
const cart = require('./routers/cart.v1.router')
const orders = require('./routers/orders.v1.router')

app.use('/products', products)
app.use('/user', user)
app.use('/login', login)
app.use('/signup', signup)
app.use('/cart', cart)
app.use('/orders', orders)

app.get('/', (req, res) => {
  res.send('Welcome to Agate API!')
})

app.use(errorHandler404)

app.use(errorHandler500)

const PORT = 8000

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
