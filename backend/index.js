// Index.js = app.js and server.js

const express = require('express')
const  app  = express()
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path');
const connectDB = require('./config/db')
dotenv.config()
app.use(cors(
    {
        origin : ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
        credentials : true  
    }
)) // Cross origin resourse sharing
app.use(express.json())

const PORT = process.env.PORT
connectDB()


// Ye User Authentication ki APi hy.Like base ya starting API api/auth ye hogi 
// ye API chalny ky baad ./routes/authRoutes yaha chala jye ga phir es file auth ki api's chaly ki like
// login , register  and logout ki sari api's chaly gi
app.use('/api/auth' , require('./routes/authRoutes'))

app.use('/api/products' , require('./routes/productRoutes'))

app.use('/api/orders' , require('./routes/orderRoutes'))

app.use('/api/payment' , require('./routes/paymentRoutes'))   

app.use('/api/analytics' , require('./routes/analyticsRoutes'))

///////////////////////////////////////////////////////////////////////////////////
// OTP ky liye ye wla seen krna hy                                    /////////////
// router.post("/verify-email" , async (req , res) => {               ///////
//     const {email} = req.body                                         ////
//     jese hi OTP verify to model ma isVerified kovtrue kr lo         //
// Ap OTP model bhi bna skty ho user id ky liye sary OTP save hon . 5 min ky baad expire kr do
///////////////////////////////////////////////////////////////////////////////////

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}




// Server Run code here
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})