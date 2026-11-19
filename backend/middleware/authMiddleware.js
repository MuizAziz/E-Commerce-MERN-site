const jwt = require('jsonwebtoken')
const User = require('../model/User')

const protect = async (req , res , next) => {
    let token
  //  Ye check karta hai ke authorization header Bearer se start ho raha hai ya nahi.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }
        catch (error){
            res.status(401).json({message : "Not Authorized , Token failed"})
        }
    }
    if(!token){
        res.status(401).json({message : "Not Authorized , Token failed"})
    }
}

module.exports = {protect}