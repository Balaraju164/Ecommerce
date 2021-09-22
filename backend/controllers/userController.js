const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken=require('../utilities/generateWebToken')

/* @desc     Auth user & get token
   @route    POST /api/user/login
   @Acess    Public     */  

const authUser= asyncHandler(async(req,res)=>{
    const {mail,password}=req.body
    const user=await User.findOne({mail})
    if(user && (await user.matchpassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.mail,
            admin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid credentails")
    }
})

/* @desc     GET user profile
   @route    GET /api/user/profile
   @Acess    private     */  

const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)  //req.user -> gives same result
    if (user) {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.mail,
            admin:user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

/* @desc     Update user profile
   @route    PUT /api/user/profile
   @Acess    private     */  

   const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)  //req.user -> gives same result
    if (user) {
        user.name=req.body.name || user.name
        user.mail=req.body.mail || user.mail
        if(req.body.password)
        {
            user.password=req.body.password
        }
        const updateUser= await user.save()
        res.json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.mail,
            admin:updateUser.isAdmin,
            token:generateToken(updateUser._id)
        })
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

/* @desc     Register new user
   @route    GET /api/user
   @Acess    public     */  

const registerUser=asyncHandler(async(req,res)=>{
    const {name,mail,password}=req.body
    const existeduser = await User.findOne({mail})
    if(existeduser){
        res.status(400)
        throw new Error('User already exists')
    }
    const user=await User.create({name,mail,password})
    if (user) {
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.mail,
            admin:user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('user not found')
    }
})

module.exports = {authUser,getUserProfile,registerUser,updateUserProfile}