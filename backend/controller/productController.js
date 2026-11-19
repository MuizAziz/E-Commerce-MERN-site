// Products ka model
const Product =  require('../model/Product')
// Multer ky through CLOUDINARY py upload kry gy apni images and return ma images ka URL lenge
const cloudinary = require('../config/cloudinary')


//  1. Simply Products aa rhy hain Model sy
// Note : Agar sary Products chahiye hon to ye call hoga
const getProducts = async (req , res) => {
    try {
        const products  = await Product.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Note : Agar sigle selected Product chahiye ho to ye call hoga
const getProductById = async (req , res) => {
    try{
        const product = await Product.findById(req.params.id)
        // Agar es specific id py product ho to response ma dy do otherwise 404 error do.
        if(product){
            res.json(product)
        }else{
            res.status(404).json({message : 'Product not found'})
        }
    } catch (error) {
        res.status(500).json({message : 'Server Error'})
    }
}

const createProduct = async (req , res) => {
   try {
    // Destructure kr ky body sy inforamtion niakl rahy hain
    const { name , description , price , category , stock} = req.body
    // starting ma imageUrl ni hy , jb cloudinary sy url ayega to yaha store hojye ga
    let  imageUrl = ''
    // Checks if file is uploaded or not
    if(req.file){
     //   cloudinary: Our Cloudinary configuration.
     //   uploader.upload(): Uploads an image to Cloudinary.
     //   req.file.path: The local path of the uploaded file.
     //   await: Waits until Cloudinary finishes uploading.
        const result = await cloudinary.uploader.upload(req.file.path)
        // Cloudinary returns a secure URL for the uploaded image.
        imageUrl = result.secure_url
    }
    // Making our new product
    const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        imageUrl
    })
    // Saving the product in mongoDB
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
   } catch (error) {
    res.status(500).json({message : error.message})
   }
}

const updateProduct = async (req , res) => {
    try {
        const {name , description , price , category , stock} = req.body
        // id ki help sy product search  hoga
        const product = await Product.findById(req.params.id)
        // agar product exist krta hy
        if(product){
            // Agar new name diya gya hy to usy use kro otherwise purana use kro
            // Bcz admin specific fields bhi update kr skta hy
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.category = category || product.category
            product.stock = stock || product.stock
            // Ab text wla kam hogya to check krta hy ki admin ny new image upload ki hy ya ni
            if(req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                product.imageUrl = result.secure_url
            }
            const updateProduct = await product.save()
            res.json(updateProduct)
        } else {
            res.status(404).json({message : 'Product not found'})
        }
    } catch (error) {
        res.status(500).json({message : 'Server error'})
    }
}

const deleteProduct = async (req , res) => {
   try {
     const product = await Product.findById(req.params.id)
    if(product) {
        await product.deleteOne()
        res.json({massage : 'Product Removed'})
    } else {
        res.status(404).json({message : 'Product not found'})
    }
   } catch (error) {
    res.status(500).json({message : error.message})
    console.log(error.message)
   }
}

module.exports = {getProducts , createProduct , getProductById , updateProduct , deleteProduct}
