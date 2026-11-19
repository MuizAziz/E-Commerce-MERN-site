// Jab customer products purchase karne ke liye confirm karta hai, to website us purchase ki complete details      database mein save karti hai. Isi record ko Order kehte hain.

const Order = require('../model/Order')
const sendEmail = require('../utils/sendEmail')

const createOrder = async (req , res) => {
    try {
        const {items , totalAmount , address , paymentId} = req.body
        if(!items || items.length === 0 || !totalAmount || !address){
            return res.status(400).json({massage : 'Invalid order data'})
        } else {
            const order = new Order({
                user : req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })
            await order.save()
            const message = `Dear ${req.user.name}, \n\nThank you for your order! Your order has been successfully created with the folowing details:\n\nOrder ID: ${order._id}\nTotal Amount $${totalAmount}\nShipping Address: ${address}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nShopNest Team`

            await sendEmail(req.user.email , 'Order created' , message)
            res.status(201).json({message : 'Order created  Successfully' , order})
        }
    } catch (error) {
        res.status(500).json({message : 'Server error' , error : error.message})
    }
}

const myOrders = async (req , res) => {
    try {
        // Order ke andar jo product ki ID saved hai, us ID ki help se Product collection se uski details nikal kar order ke andar show karna.
        const orders = await Order.find({user : req.user._id}).populate('items.productId' , 'name price')
        res.json(orders)
    } catch (error) {
        res.status(500).json({message : 'Error fetching orders' , error})
    }
} 

const getOrders = async (req , res) => {
    try {
        const orders = await Order.find({}).populate('user' , 'id name')
        res.json(orders)
    } catch (error) {
        res.status(500).json({message : 'Error fetching orders' , error})
    }
}

// This function updates the status of an existing order.
const updateOrderStatus = async (req , res) => {
    try {
       // Get status from request body via destructuring
        const {status} = req.body
        const order = await Order.findById(req.params.id)
        if(order){
            order.status = status
            await order.save()
            res.json({message : 'Order status updated' , order})
        } else {
            res.status(404).json({message : 'Order not found'})
        }
    } catch (error) {
        res.status(500).json({message : 'Error updating order status' , error})
    }
}

module.exports = {createOrder  , getOrders , myOrders , updateOrderStatus}