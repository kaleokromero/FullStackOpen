const {describe, beforeEach ,test, after} = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

let createdUser;

describe("First user post", async () => {
    
  beforeEach(async () => {
    const password = await bcrypt.hash('secret', 10);
    const user = new User({
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      passwordHash:password,
    })
        createdUser = await user.save();
    })
    test('Post request', async() => {
        const newBlog = {
            "url": "https://fullstackopen.com/en/part4/token_authentication",
            "title": "Testing user´s POST to check the response body",
            "author": "Kaleo",
            "userId": createdUser._id,
            "likes":0
        }
        const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        assert.strictEqual(response.status, 201)
    })
})
after(async () => {
    await mongoose.connection.close()
})