const {test, after} = require('node:test')
const assert = require('node:assert')
const blogsRouter = require('../controllers/blogs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Missing content', async() => {
    const blogs = await api.get('/api/blogs')
    const newBlog = {
        "author": "Kaleo",
        "url": "fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
        "likes": 2
    }
    const response = await api.post('/api/blogs').send(newBlog)
    assert.equal(response.status, 400)
})
test('Missing url', async() => {
    const blogs = await api.get('/api/blogs')
    const newBlog = {
        "title": "Automated test for missing content 4*12",
        "author": "Kaleo",
        "likes": 2
    }
    const response = await api.post('/api/blogs').send(newBlog)
    assert.equal(response.status, 400)
})
after(async () => {
   await mongoose.connection.close()
})