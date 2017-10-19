"use strict";
require('dotenv').config({path: __dirname + '/.env'})

// Basic express setup:
const PORT          = process.env.PORT || 8080
const express       = require('express')
const bodyParser    = require('body-parser')
const app           = express()
const mongoose      = require('mongoose')
const morgan        = require('morgan')
const path          = require('path')
const cookieParser  = require('cookie-parser')

// Set middle-ware
app.use(morgan('dev'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist/')))
app.use(cookieParser())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
mongoose.set('debug', true)

// API Routers
app.use("/tweets", require("./routes/tweets"))
app.use("/users", require('./routes/users'))

// Start server
app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT)
})
