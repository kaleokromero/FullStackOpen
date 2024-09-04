const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs',({url: 1, title: 1, author: 1}))
    response.json(users)
})

userRouter.post('/', async(request, response) => {
    const {username, name, password} = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    try {
    const registered = await user.save()
    response.status(201).json(registered)
    } catch(error) {
        return next(error)
    }
})
module.exports = userRouter
//LOOK MORE INTO SALT ROUNDS AND WHY THE POST URL TO /