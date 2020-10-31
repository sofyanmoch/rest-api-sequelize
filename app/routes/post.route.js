module.exports = app => {
    const posts = require('../controllers/post.controller');

    let router = require('express').Router()

    //create new Post
    router
    .post('/add', posts.create)
    .get('/findall', posts.findAll)
    .get('/findone/:id', posts.findOne)
    .put('/update/:id', posts.update)
    .delete('/delete/:id', posts.delete)
    .delete('/deleteall', posts.deleteAll)

    app.use('/api/posts', router)
}