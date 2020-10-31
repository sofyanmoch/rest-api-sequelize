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

// Find All
exports.findAll = (req, res) => {
    const title = req.query.title
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({where: condition})
        .then((data) => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Internal server error'
            })
        });
}

// find single
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(500).send({
                message: `error retrieving post with id =${id}`
            })
        })
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