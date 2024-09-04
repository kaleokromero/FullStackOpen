const config = require('./utils/config')
const express = require('express')
const app = express()

const cors = require('cors')

const blogsRouter = require('./controllers/blogs.js')
const userRouter = require ('./controllers/users.js')
const loginRouter = require('./controllers/login.js')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware.js')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

mongoose.connect(url)
.then(() => {
    console.log('Connected to MongoDB !')
})
.catch(error => {
    console.log("Error connecting to MongoDB ", error)
})


app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', middleware.tokenExtractor,  loginRouter)

app.use(middleware.errorHandler)

module.exports = app;