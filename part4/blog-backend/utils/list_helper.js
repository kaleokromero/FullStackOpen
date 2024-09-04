const User = require("../models/user");

const dummy = (blogs) => {
    return 1;
}
const totalLikes = (blogs) => {
    let currentLikes = 0
    blogs.forEach(blog => {
        currentLikes += blog.likes
    });
    return currentLikes
}
const favoriteBlog = (blogs) => {
    let favorite = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}
const mostLikes = (blogs) => {
    let favorite = {}
    let authorLikes= {}

    blogs.forEach(blog => {
        if(authorLikes[blog.author]) {
            authorLikes[blog.author] += blog.likes
        } else {
            authorLikes[blog.author] = blog.likes
        }
    })
    for (const author in authorLikes) {
        if(favorite.likes === undefined || authorLikes[author] > favorite.likes) {
            favorite = {
                author: author,
                likes: authorLikes[author]
            }
        }
    }
    return favorite
}
const mostPosts = (blogs) => {
    let mostActiveAuthor = {}
    let blogsAuthor = {}

    blogs.forEach(blog => {
        if(blogsAuthor[blog.author]) {
           blogsAuthor[blog.author] += 1
        } else {
            blogsAuthor[blog.author] = 1
        }
    })

    for(const author in blogsAuthor) {
        if(mostActiveAuthor.blogs === undefined || blogsAuthor[author] > mostActiveAuthor.blogs) {
            mostActiveAuthor = {
                author: author,
                blogs: blogsAuthor[author]
            }
        }
    }
    return mostActiveAuthor
}
const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}
module.exports = {
    dummy,
    totalLikes,
    mostPosts,
    favoriteBlog,
    mostLikes,
    usersInDB
}