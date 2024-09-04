const {describe, test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Creating account', () => {
    beforeEach(async ()=> {
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({username: 'root', passwordHash})
        await user.save()
    })
    test('creation succeeds with unique username', async () => {
        const fetchingUsers = await helper.usersInDB()
        
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen', 
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const refreshUsers = await helper.usersInDB()
        console.log(refreshUsers)

        const usernames = refreshUsers.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
    
    after(async () => {
        mongoose.connection.close()
    })
})