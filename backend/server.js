import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloduinary.js'

//app config
const app = express()
const port = process.env.PORT || 9000

//database connection
connectDB()

//cloudinary connection
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//API endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hello from backend')
})

//Server setup
app.listen(port, () => {
    console.log(`Listening to server requests on http://localhost:${port}`)
})