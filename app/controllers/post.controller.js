const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;
 
// Create 
exports.create = (req, res) => {
    // Validate
    if(!req.body.title) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    }
    // Create Post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published? req.body.published : false
    }

    Post.create(post)
        .then((result) => {
            res.send(result)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Internal server error'
            })
        })
}

//Retrieve All
exports.findAll = (req, res) => {

}

// find single
exports.findOne = (req, res) => {

}

// Update a Post
exports.update = (req, res) => {

}

// Delete a Post
exports.delete = (req, res) => {

}

// Delete All Post
exports.deleteAll = (req, res) => {

}

// Find All Publish = true
exports.findAllPublish = (req, res) => {

}