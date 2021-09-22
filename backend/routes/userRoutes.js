const express = require('express')
const router = express.Router()
const {auth}= require('../middleware/authMiddleware')
const {authUser,getUserProfile,registerUser,updateUserProfile} =require('../controllers/userController')

router.route('/').post(registerUser)
router.post('/login',authUser)
router.get('/profile',auth,getUserProfile)
router.put('/profile',auth,updateUserProfile)

module.exports=router