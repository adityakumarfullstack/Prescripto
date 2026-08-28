import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

//app config
const app = express()
const port = process.env.PORT || 9000

//database connection
connectDB()

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