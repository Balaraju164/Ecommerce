const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

/* @desc     Creat new Order
   @route    POST /api/orders
   @Acess    Private     */  

const addOrderItems= asyncHandler(async(req,res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice,totalPrice}=req.body
    if(orderItems && orderItems.length===0)
    {
        res.status(400)
        throw new Error('No orders found')
        return
    }
    else{
        const order = new Order({
            orderItems,user:req.user._id, shippingAddress, paymentMethod, itemPrice, taxPrice, shippingPrice,totalPrice 
        })

        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})

/* @desc     Get Order details
   @route    Get /api/orders/:id
   @Acess    Private     */  

const getOrderByID= asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name mail')
    if(order)
    {
        res.json(order)
    }else{
        res.status(401)
        throw new Error('No order found for this ID')
    }
})

/* @desc     Get user orders
   @route    Get /api/orders/myorders
   @Acess    Private     */  

const getMyOrders= asyncHandler(async(req,res)=>{
    const user=req.user._id
    const orders=await Order.find({user})
    res.json(orders)
})



module.exports={addOrderItems, getOrderByID,getMyOrders}