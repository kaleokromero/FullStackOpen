const {test, after} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as a JSON', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
    mongoose.connection.close()
})

test('Unique identifier', async () => {
    const response = await api
    .get('/api/blogs')
    const body = response.body
    const firstBlog = body[0]
        //hasOwn can ONLY check objects
    assert.ok(Object.hasOwn(firstBlog, 'id'))
})