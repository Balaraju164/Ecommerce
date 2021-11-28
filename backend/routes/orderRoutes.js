const express = require('express')
const router = express.Router()
const {auth, admin}= require('../middleware/authMiddleware')
const {addOrderItems,getOrderByID,getMyOrders, getOrders, updateOrderAsDelivered, updateOrderAsPaid} =require('../controllers/orderController')

router.route('/').post(auth,addOrderItems).get(auth,admin,getOrders)
router.route('/myorders').get(auth,getMyOrders)
router.route('/:id').get(auth,getOrderByID)
router.route('/:id/paid').put(auth,admin,updateOrderAsPaid)
router.route('/:id/deliver').put(auth,admin,updateOrderAsDelivered)

module.exports=router