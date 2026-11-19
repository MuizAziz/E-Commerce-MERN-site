// Password Hash kry  ga
const bcrypt = require('bcryptjs')
// Authentication Tokens generate kry ga
const jwt  = require('jsonwebtoken')
// Email send kry ga
const sendEmail = require('../utils/sendEmail')
// Model hy
const User = require('../model/User')
 
// User ki id recieve kry ga then it phir 3 kaam kry ga.
// 1. jwt.sign token generate krta hy
// 2. .env file sy secret key  ati hy
// 3. expiry duration dyni hoti  hy
const generateToken = (id) => {
    return  jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'})
}

const registerUser = async (req , res) => {
// Destructure kr ky body sy name email and password lia hy
    const {name , email , password} = req.body
    try {
        // 1. ye function check kry ga ki ye user already exist krta hy ya ni
        const existingUser = await User.findOne({email})
        if(existingUser){
            return  res.status(400).json({message : 'User already exists'})
        }

        // 2. Salt password hashing mein extra random security add karta hai, taake same passwords ke hashes bhi different ho sakte hain. Salt ek random value hoti hai jo password hash karne se pehle uske saath add ki jati hai. 10 ka mtlb hy 10 random values. Ye hm apni mrzi sy de skty hain.
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password , salt)
       // Database ma new user create ore save hua hy
        const user = await User.create({name  , email , password : hashedPassword})
        // Agar user create  hua hy to
        if(user){
            // 6 digit OTP generate hua hy .es py baad ma operation kiye jai gy.
            const otp = Math.floor(100000 + Math.random() * 900000).toString()

            const message =`Welcome to ShopNext , ${name}! Thankyou for registering with us . We are 
            exited to have you as part of our community . To complete your registration, Your
            OTP for ShopNext registration is : ${otp}`

            // Eska real function alag sy defined hy
            //               to                        Subject                           Text
            await sendEmail(email , 'Welcome to ShopNest - Your OTP for registration' , message)

            res.status(201).json({
                _id : user._id,
                name :  user.name,
                email : user.email,
                role : user.role,
                token : generateToken(user._id)
            })
        }else{
            res.status(400).json({message : 'Invalid user data'})
        }
    } catch (error) {
        console.log(error.message)
       return res.status(500).json({message : error.message})
    }
}

const loginUser = async (req , res) => {
    const {email , password} = req.body
    try {
        // Email search kry ga
        const user = await User.findOne({email})
        // Agar user milgya hy and password ore hased password compare hogya hy
        if(user && (await bcrypt.compare(password , user.password))){
            res.json({
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                // Token generate hoga for id
                token : generateToken(user._id)
            })
        }else {
            res.status(400).json({message : 'Invalid email or password'})
        }
    } catch (error) {
        res.status(500).json({message : 'Server error'})
    }

}

// Just made to show all users to the ADMIN
const getUsers = async (req , res) => {
    try {
        // {} empty es liye hy ki sary users aa jain and -password ka mtlb ky password na aye
        const users = await User.find({}).select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({message  : 'Server error'})
    }
}

module.exports = {registerUser , loginUser , getUsers}