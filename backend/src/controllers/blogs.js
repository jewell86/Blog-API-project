const models = require('../models/blogs')

function getAll(req, res, next){
    // const limit = req.query.limit
    const data = models.getAll()
    res.status(200).send({ data })
}

function getOne(req, res, next){
    const id = req.params.id
    const data = models.getOne(id)
    res.status(200).send({ data })
}

function create(req, res, next){
    const title = req.body.title
    const content = req.body.content
    const data = models.create(title, content)
    res.status(200).send({ data })
}

function update(req, res, next){

}

function deleteOne(req, res, next){
    
}


module.exports = { getAll, getOne, create, update, deleteOne }