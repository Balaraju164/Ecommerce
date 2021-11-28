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

/* @desc     Get admin orders
   @route    Get /api/orders/
   @Acess    Private     */  

   const getOrders= asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name')
    res.json(orders)
})

/* @desc     Update orders to delivered
   @route    PUT /api/orders/:id/deliver
   @Acess    Private     */  

   const updateOrderAsDelivered= asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivered=true,
        order.deliveredAt=Date.now()
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

/* @desc     Update orders to delivered
   @route    PUT /api/orders/:id/deliver
   @Acess    Private     */  

   const updateOrderAsPaid= asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isPaid=true,
        order.paidAt=Date.now()
        const updatedOrder=await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})



module.exports={addOrderItems, getOrderByID,getMyOrders,getOrders,updateOrderAsDelivered,updateOrderAsPaid}