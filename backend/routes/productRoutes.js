const express = require('express')
const router = express.Router()
const {auth,admin}= require('../middleware/authMiddleware')
const {getProducts,getProductsById,deleteProduct, updateProduct, createProduct} =require('../controllers/productController')

router.route('/').get(getProducts).post(auth,admin,createProduct)
router.route('/:id').get(getProductsById).delete(auth,admin,deleteProduct).put(auth,admin,updateProduct)

module.exports=router