const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express();
app.use(bodyParser.json())

app.use(cors())

// DB connect
const initializeDBConnect = require("./db/db.connect.js")
initializeDBConnect()

// Middlewares
const errorHandler404 = require("./middlewares/errorHandler404.middleware.js")
const errorHandler500 = require("./middlewares/errorHandler500.middleware.js")

// Routers
const products = require("./routers/products.v1.router.js")
const users = require("./routers/users.v1.router.js")

app.use("/products", products)
app.use("/users", users)


app.get('/', (req, res) => {
  res.send("Welcome to Agate's Rest API! \n Building...")
});

app.use(errorHandler404)

app.use(errorHandler500)

app.listen(8000, () => {
  console.log('server started on port 8000');
});
