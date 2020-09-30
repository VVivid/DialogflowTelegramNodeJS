const express = require('express')
const app = express()

const botRoute = require('./routes/botRoute')



app.use(express.json()) //Middleware 

app.use('/',botRoute) //Route

module.exports = app
