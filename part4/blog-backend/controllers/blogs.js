require('dotenv').config()

const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body
    const decoded = jwt.verify(request.token, process.env.SECRET)

    if(!decoded.id) {
        return response.status(401).json({error: 'token invalid'})
    }

    try {
    const user = await User.findById(decoded.id)
    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user,
        likes: body.likes
    })
    if(!request.body.likes) {
        blog.likes = 0
    }
    if(!request.body.title || !request.body.url) {
        return response.status(400).json({error: 'title and/or body are required'})
    }

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)

        await user.save()
        console.log(savedBlog)

        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/', async (request,response) => {
    const blogs = await Blog
    .find({}).populate('user',{username:1, name:1})
    response.json(blogs)
})

blogsRouter.get('/:id', (request,response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if(blog) {
        response.json(blog)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;
        const blog = await Blog.findById(request.params.id).populate('user')
            console.log("User extractor - ", request.user._id);
            console.log("blog - ", blog.user._id);
            console.log(request.user._id.toString() == blog.user._id.toString() )
    
        if (request.user._id.toString() == blog.user._id.toString()) {
            const updatedBlog = {
                url: body.url,
                title: body.title,
                author: body.author,
                likes: body.likes
            }
            const success = await Blog.findByIdAndUpdate(blog._id, updatedBlog, { new: true });
            return response.status(200).json(success);
        } else {
            return response.status(401).json({ error: 'Unauthorized' });
        }
})
blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user')
    
    if(request.user._id.toString() == blog.user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(401).json
        ({error: 'Only the author have permission to delete'})
    }
})

module.exports = blogsRouter