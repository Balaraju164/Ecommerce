const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes=require('./routes/orderRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

const app =express()

app.use(express.json())

app.get('/',(req,res)=>{res.send('Bala is running....')})

app.use('/api/products',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/orders',orderRoutes)

//Middleware -1
app.use(notFound)

//Middleware -2
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`))