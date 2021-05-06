const express = require("express")

const errorHandler500 = (err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({ status: false, message: "The server returned an error! ", error: err.message })
}

module.exports = errorHandler500