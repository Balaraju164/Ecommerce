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

/* @desc     DELETE product
   @route    DELETE /api/products/:id
   @Acess    private admin     */  

   const deleteProduct=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id) 
    if(product){
        await product.remove()
        res.json({Message:'Product Removed'})
    }else{
        res.status(404)
        throw new Error('No product found')
    }
})

/* @desc     POST product
   @route    POST /api/products
   @Acess    private admin     */  

const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        name:'Sample product',
        price:0,
        user:req.user._id,
        image: '/images/airpods.jpg',
        brand:'sample',
        category:'sample',
        countInStock:0,
        numReviews:0,
        description:'sample product'
    })
    const createproduct=await product.save() 
    res.status(201).json(createproduct)
})


/* @desc     POST product
   @route    POST /api/products
   @Acess    private admin     */  

const updateProduct=asyncHandler(async(req,res)=>{
   const {name,price,description,countInStock,image,brand,category}=req.body
   const product=await Product.findById(req.params.id)
   if(product){
    product.name=name
    product.price=price
    product.description=description
    product.countInStock=countInStock
    product.image=image
    product.brand=brand
    product.category=category

    const updateproduct=await product.save() 
    res.status(201).json(updateproduct)
   }else{
    res.status(404)
    throw new Error('No product found')
   }
})

module.exports={getProducts,getProductsById,deleteProduct,createProduct,updateProduct}