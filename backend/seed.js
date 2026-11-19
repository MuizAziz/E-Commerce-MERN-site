console.log("1. Seed file started")

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')

console.log("2. Packages imported")

const User = require('./model/User')
const Product = require('./model/Product')
const Order = require('./model/Order')

dotenv.config()

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected')

        // Clear existing data (development only!)
        await Order.deleteMany({})
        await Product.deleteMany({})
        await User.deleteMany({})

        // Hash password
        const hashedPassword = await bcrypt.hash('123456', 10)

        // Create users
        const users = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
                verified: true
            },
            {
                name: 'Ali',
                email: 'ali@example.com',
                password: hashedPassword,
                role: 'user',
                verified: true
            },
            {
                name: 'Ahmed',
                email: 'ahmed@example.com',
                password: hashedPassword,
                role: 'user',
                verified: true
            },
            {
                name: 'Sara',
                email: 'sara@example.com',
                password: hashedPassword,
                role: 'user',
                verified: true
            }
        ])

        // Create products
        const products = await Product.insertMany([
            {
                name: 'Wireless Headphones',
                description: 'High quality wireless headphones',
                price: 5000,
                category: 'Electronics',
                stock: 20,
                imageUrl: 'https://placehold.co/400x300?text=Headphones'
            },
            {
                name: 'Smart Watch',
                description: 'Modern smartwatch with fitness tracking',
                price: 8000,
                category: 'Electronics',
                stock: 15,
                imageUrl: 'https://placehold.co/400x300?text=Smart+Watch'
            },
            {
                name: 'Smart Watch',
                description: 'Modern smartwatch with fitness tracking',
                price: 8000,
                category: 'Electronics',
                stock: 15,
                imageUrl: 'https://placehold.co/400x300?text=Smart+Watch'
            },
            {
                name: 'Running Shoes',
                description: 'Comfortable shoes for daily running',
                price: 4500,
                category: 'Fashion',
                stock: 30,
                imageUrl: 'https://placehold.co/400x300?text=Shoes'
            },
            {
                name: 'Backpack',
                description: 'Durable backpack for everyday use',
                price: 2500,
                category: 'Accessories',
                stock: 25,
                imageUrl: 'https://placehold.co/400x300?text=Backpack'
            }
        ])

        // Create orders
        await Order.insertMany([
            {
                user: users[1]._id,
                items: [
                    {
                        productId: products[0]._id,
                        qty: 1,
                        price: products[0].price
                    },
                    {
                        productId: products[1]._id,
                        qty: 1,
                        price: products[1].price
                    }
                ],
                totalAmount: 13000,
                address: {
                    fullName: 'Ali',
                    street: 'Main Road',
                    city: 'Lahore',
                    postalCode: '54000',
                    country: 'Pakistan'
                },
                paymentId: 'PAY12345',
                status: 'delivered'
            },
            {
                user: users[2]._id,
                items: [
                    {
                        productId: products[2]._id,
                        qty: 2,
                        price: products[2].price
                    }
                ],
                totalAmount: 9000,
                address: {
                    fullName: 'Ahmed',
                    street: 'Model Town',
                    city: 'Lahore',
                    postalCode: '54700',
                    country: 'Pakistan'
                },
                paymentId: 'PAY12346',
                status: 'shipped'
            },
            {
                user: users[3]._id,
                items: [
                    {
                        productId: products[3]._id,
                        qty: 1,
                        price: products[3].price
                    }
                ],
                totalAmount: 2500,
                address: {
                    fullName: 'Sara',
                    street: 'Mall Road',
                    city: 'Islamabad',
                    postalCode: '44000',
                    country: 'Pakistan'
                },
                paymentId: 'PAY12347',
                status: 'pending'
            }
        ])

        console.log('Dummy data inserted successfully!')

        console.log('Admin login:')
        console.log('Email: admin@example.com')
        console.log('Password: 123456')

        await mongoose.disconnect()

    } catch (error) {
        console.log('Seeding Error:', error)
        await mongoose.disconnect()
        process.exitCode = 1
    }
}

seedData()
