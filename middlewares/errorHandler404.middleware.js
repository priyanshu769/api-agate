const express = require("express")

const errorHandler404 = (req, res)=> {
  res.status(404).json({status: false, message: "Page not found!"})
}

module.exports = errorHandler404