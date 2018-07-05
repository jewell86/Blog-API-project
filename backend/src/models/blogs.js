const uuid = require('uuid')

const blogs = []

function getAll(){
    return blogs
}

function getOne(id){
    let blog = blogs.find(post => post.id === id)
    return blog
}

function create(title, content) {
    const post = { id: uuid(), title, content }
    blogs.push(post)
    return blogs
}

function update(id, title, content) {
    const blog = blogs.find(blog => blog.id === id)
    blog.title = title
    blog.content = content
    return blogs
}

function deleteOne(id){
    const post = blogs.find(post => post.id === id)
    const index = blogs.indexOf(post)
    blogs.splice(index, 1)
    return blogs
}

module.exports = { getAll, getOne, create, update, deleteOne }