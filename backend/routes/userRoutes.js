const express = require('express')
const router = express.Router()
const {auth,admin}= require('../middleware/authMiddleware')
const {authUser,getUserProfile,registerUser,updateUserProfile, getAllUsers, deleteUser, getUserById, updateUserById} =require('../controllers/userController')

router.route('/').post(registerUser).get(auth,admin,getAllUsers)
router.post('/login',authUser)
router.get('/profile',auth,getUserProfile)
router.put('/profile',auth,updateUserProfile)
router.route('/:id').delete(auth,admin,deleteUser).get(auth,admin,getUserById).put(auth,admin,updateUserById)

module.exports=router