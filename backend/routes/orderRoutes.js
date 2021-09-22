const express = require('express')
const router = express.Router()
const {auth}= require('../middleware/authMiddleware')
const {addOrderItems} =require('../controllers/orderController')

router.route('/').post(auth,addOrderItems)

module.exports=router