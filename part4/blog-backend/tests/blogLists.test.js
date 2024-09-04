const {test, after} = require('node:test')
const assert = require('node:assert')
const blogsRouter = require('../controllers/blogs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Post requests', async() => {
    const blogs = await api.get('/api/blogs')
    const blogsLength = blogs.body.length

    const newBlog = {
        "title": "Automated test",
        "author": "Kaleo",
        "url": "fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
        "likes": "2"
    }
    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.status, 201)

    const refreshBlogs = await api.get('/api/blogs')
    const refreshBlogsLength = refreshBlogs.body.length

    assert.equal(refreshBlogsLength, blogsLength +1)
})
after(async () => {
    mongoose.connection.close()
})

test('Likes have a default value of 0', async() => {
    const blogs = await api.get('/api/blogs')
    const newBlog = {
        "title": "Automated test on post requests",
        "author": "Kaleo",
        "url": "fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
    }
    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.status, 201)

    const like = response.body.likes
    assert.equal(like, 0)
})

after(async () => {
    mongoose.connection.close()
})
