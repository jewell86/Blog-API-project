const uuid = require('uuid')

const blogs = []

function getAll(){
    return blogs
}
//UNUSED FUNCTION
function getOne(id){
    let blog = blogs.find(blog => blog.id === id)
    return blog
}

function create(title, content) {
    const blog = { id: uuid(), title, content }
    blogs.push(blog)
    return blog
}

function update(id, title, content) {
    const blog = blogs.find(blog => blog.id === id)
    blog.title = title
    blog.content = content
    return blog
}

function deleteOne(id){
    const blog = blogs.find(blog => blog.id === id)
    const index = blogs.indexOf(blog)
    blogs.splice(index, 1)
    return blog
}

module.exports = { getAll, getOne, create, update, deleteOne }