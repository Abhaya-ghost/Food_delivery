const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app =express()
dotenv.config()

const imageRoute = require('./routes/imageRoute')
const userRoute = require('./routes/userRoute')
const foodRoute = require('./routes/foodRoute')
const orderRoute = require('./routes/orderRoute')

const cors = require('cors')
const port = process.env.PORT || 8000
app.use(cors())
app.get('/', (req,res) => {
    res.send('Hello World')
})
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin",'*')
    res.header("Access-Control-Allow-Headers",'*')

    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods",'PUT,POST,DELETE,GET')
        return res.json({})
    }

    next()
})

//connect mongodb
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
})
mongoose.connection.on('connected', () => {
    console.log('connected')
})

app.use(express.json({limit: '3mb'}))

app.listen(port, () => {
    connect()
    console.log(`Listening from ${port}`)
})

//routes use
app.use('/api/v1/all', imageRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/food', foodRoute)
app.use('/api/v1/order', orderRoute)