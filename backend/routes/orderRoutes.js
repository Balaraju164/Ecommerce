const express = require('express')
const router = express.Router()
const {auth}= require('../middleware/authMiddleware')
const {addOrderItems,getOrderByID,getMyOrders} =require('../controllers/orderController')

router.route('/').post(auth,addOrderItems)
router.route('/myorders').get(auth,getMyOrders)
router.route('/:id').get(auth,getOrderByID)


module.exports=router