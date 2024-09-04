const {test, after} = require('node:test')
const assert = require('node:assert')
const blogsRouter = require('../controllers/blogs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('Put tests', async () => {
    const url =  `/api/blogs/66ba5dcbfe6d34323ae9915f`

    const blog = await api.get(url)
    const updated = {
        title: "PUT test",
        author: "Kaleo",
        url: "fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
        likes: 7
    }

    
    const response = await api.put(url).send(updated)
    assert.strictEqual(response.status, 200)

    const check = await api.get(url)

    const title = response.body.title
    assert.equal(title, "PUT test")

})

test('Delete tests', async () => {
    const url = `/api/blogs/66ba794df1c5930582872b31`
    const blog = await api.get(url)

    const response = await api.delete(url)
    assert.strictEqual(response.status, 204)
})


after( async () => {
    await mongoose.connection.close()
})
