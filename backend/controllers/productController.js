const asyncHandler = require('express-async-handler')
const Product = require('../models/productmodel')

/* @desc     fetch all products
   @route    GET /api/products
   @Acess    Public     */  

const getProducts= asyncHandler(async(req,res)=>{
    const pageSize=8
    const page= Number(req.query.pageNumber) || 1

    const keyword=req.query.keyword? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{}

    const count= await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))

    res.json({products,page,pages:Math.ceil(count/pageSize)})
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


/* @desc     update product
   @route    PUT /api/products/:id
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

/* @desc     Create review of product
   @route    POST /api/products/:id/reviews
   @Acess    private      */  

   const CreateProductReview=asyncHandler(async(req,res)=>{
    const {rating,comment}=req.body
    const product=await Product.findById(req.params.id)
    if(product){
     const alreadyReviewdProduct = product.review.find(r=>r.user.toString()===req.user._id.toString())
     if(alreadyReviewdProduct){
         res.status(400)
         throw new Error('Product alredy reviewed')
     }
     const review={
         name:req.user.name,
         rating:Number(rating),
         comment:comment,
         user:req.user._id
     }
     product.review.push(review)
     product.numReviews=product.review.length
     product.rating=product.review.reduce((acc,item)=>item.rating+acc,0)/product.review.length

    await product.save()
    res.status(201).json({maessage:'review added'})

    }else{
     res.status(404)
     throw new Error('No product found')
    }
 })

 /* @desc     Get top rated products
   @route    GET /api/products/top
   @Acess    Public     */ 

const getTopProducts= asyncHandler(async (req,res)=>{
    const products=await Product.find({}).sort({rating:-1}).limit(3)
    res.json(products)
})

module.exports={getProducts,getProductsById,deleteProduct,createProduct,updateProduct,CreateProductReview,getTopProducts}