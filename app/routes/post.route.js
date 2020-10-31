module.exports = app => {
    const posts = require('../controllers/post.controller');

    let router = require('express').Router()

    //create new Post
    router.post('/add', posts.create)

    app.use('/api/posts', router)
}