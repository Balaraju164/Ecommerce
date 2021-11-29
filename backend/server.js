const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes=require('./routes/orderRoutes')
const uploadRoutes=require('./routes/uploadRoutes')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
const path=require('path')

dotenv.config()

connectDB()

const app =express()

app.use(express.json())

app.use('/api/products',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)


const directory = path.resolve(__dirname,'/frontend/public/images')
app.use('/uploads',express.static(path.join(directory)))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname,'..', 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

//Middleware -1
app.use(notFound)

//Middleware -2
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`))