const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { admin } = require('../middleware/adminMiddleware')
const { getProducts , createProduct , getProductById , updateProduct , deleteProduct } = require('../controller/productController')
const router  = express.Router()
const multer = require('multer')
// Image receive karta hai aur temporarily uploads folder mein rakhta hai
const upload = multer({dest : 'uploads/'})


// This is the shorthand . Agar '/' py GET call hua hy to getProducts wala function chala do
// agar POST call hua hu to createProduct chala do. 

// We can also write like this
// router.post('/' , createProduct)
// router.get('/' , getProducts)

/*Products wly ma GET to simple user kr ly ga but user create ni kr skta wo sirf admin kr skta hy
so to handle it hamy ek MIDDLEWARE bnana hoga */
// upload.single('image') = 
router.route('/').get(getProducts).post(protect , admin , upload.single('image') , createProduct)
router.route('/:id').get(getProductById).put(protect , admin , upload.single('image') , updateProduct).delete(protect , admin , deleteProduct)

module.exports = router