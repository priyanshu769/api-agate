const mongoose = require("mongoose")
require('dotenv').config();

const initializeDBConnect = async () => {
  try {
const mySecret = process.env['DB_KEY']
    mongoose.connect(`mongodb+srv://priyanshu769:${mySecret}@priyanshu-cluster.q9v8t.mongodb.net/inventory?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}
)
    const db = await mongoose.connection
    console.log("connected successfully")
  } catch(error) {
    console.log("error: ", error)
  }
}

module.exports = initializeDBConnect