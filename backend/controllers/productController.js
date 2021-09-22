const asyncHandler = require('express-async-handler')
const Product = require('../models/productmodel')

/* @desc     fetch all products
   @route    GET /api/products
   @Acess    Public     */  

const getProducts= asyncHandler(async(req,res)=>{
    const products = await Product.find({})
    //throw new Error('All products were disclosed')
    res.json(products)
})

/* @desc     fetch single products
   @route    GET /api/products/:id
   @Acess    Public     */ 

const getProductsById= asyncHandler(async (req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product)
    {
        res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

module.exports={getProducts,getProductsById}