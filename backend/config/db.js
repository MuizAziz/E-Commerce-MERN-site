const mongoose = require('mongoose')

const connectDB = async (res) => {
    try {
      const conn =  await mongoose.connect(process.env.MONGO_URI) 
       console.log('DB Connected Successfully')
    } catch (error) {
      res.status(500).json({
         message : error.message
      })
    }
}

module.exports = connectDB