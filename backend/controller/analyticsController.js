// when an admin opens the dashboard, it can show:
// - Total registered users
// - Total orders
// - Total products
// - Total revenue

// Here I Imported three models bcz I needto get data from three mongoDB collections. 
const Order = require('../model/Order')
const User = require('../model/User')
const Product = require('../model/Product')


const getAdminStats = async (req , res) => {
    try {
        // It counts only users whose role is user not admin
        const totalUsers = await User.countDocuments({role : 'user'})
        // Es ma koi filter ni hy like mongoDB sy all orders count kro
        const totalOrders = await Order.countDocuments({})
        // Same concept: it counts all product documents.
        const totalProducts = await Product.countDocuments({})

        const orders = await Order.find({})
        // Reduce har order ka amount uthata hai aur previous total mein add karta jata hai. End mein humein total revenue mil jati hai.
        const totalRevenueData = orders.reduce((acc , order) => acc + order.totalAmount , 0)

        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue : totalRevenueData
        })

    } catch (error) {
        res.status(500).json({message : 'Error fetching stats' , error})
    }
}

module.exports = {getAdminStats}