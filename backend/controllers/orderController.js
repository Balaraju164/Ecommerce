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

module.exports={addOrderItems}