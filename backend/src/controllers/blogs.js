const models = require('../models/blogs')

function getAll(req, res, next){
    const data = models.getAll()
    if(!data){
        next({ status: 404, message: 'Posts not found' })
    }
    res.status(200).send({ data })
}

// UNUSED FUNCTION!
function getOne(req, res, next){
    const id = req.params.id
    const data = models.getOne(id)
    if(!data){
        next({ status: 404, message: 'Post not found' })
    }
    res.status(200).send({ data })
}

function create(req, res, next){
    if(!req.body.title || !req.body.content){
        next({ status: 400, message: 'All fields required'})
    }
    const title = req.body.title
    const content = req.body.content
    const data = models.create(title, content)
    if(!data){
        next({ status: 500, message: 'Something went wrong'})
    }
    res.status(200).send({ data })
}

function update(req, res, next){
    if(!req.body.title || !req.body.content ){
        next({ status: 400, message: 'All fields required'})
    }
    const title = req.body.title
    const content = req.body.content
    const id = req.params.id
    const data = models.update(id, title, content)
    if(!data){
        next({ status: 404, message: 'Post not found'})
    }
    res.status(200).send({ data })
}

function deleteOne(req, res, next){
    const id = req.params.id
    const data = models.deleteOne(id)
    if(!data){
        next({ status: 404, message: 'Post not found'})
    }
    res.status(200).send({ data })
}


module.exports = { getAll, getOne, create, update, deleteOne }