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
    let sort = !req.query.sort? 'id' : req.query.sort
    let type = !req.query.type? 'ASC': req.query.type
    let limit = !req.query.limit? 3 : parseInt(req.query.limit)
    let page = !req.query.page? 1 : parseInt(req.query.page)
    let offset = page === 1? 0 :(page-1) * limit 


    Post.findAll({
        // Ordering and Grouping
        // Sequelize provides the order and group options to work with ORDER BY and GROUP BY.
        order: [
            [ sort,type]
        ],

        // Limits and Pagination\
        page,offset,limit,


        // search
        where: condition
        })
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
    const id = req.params.id;

    Post.update(req.body, {
        where: { id:id }
    }).then((result) => {
        if(result == 1) {
            res.send({
                message: 'Update Success'
            })
        } else {
            res.send({
                message: `cannot update with id =${id}`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: 'Internal server error'
        })
    })
}

// Delete a Post
exports.delete = (req, res) => {
    const id = req.params.id

    Post.destroy({
        where: { id:id }
    }).then((result) => {
        if(result == 1) {
            res.send({
                message: 'Deleted Success'
            })
        } else {
            res.send({
                message: `Cannot deleted id ${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: 'Internal server error'
        })
    })
}

// Delete All Post
exports.deleteAll = (req, res) => {
    Post.destroy({
        where : {},
        truncate: false
    }).then((result) => {
        res.send({
            message:`${result} Posts deleted succesfully!`
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Internal server error'
        })
    })
}

// Find All Publish = true
exports.findAllPublished = (req, res) => {
    Post.findAll({
        where: {published:true}
    }).then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || 'Internal server error'
        })
    })
}