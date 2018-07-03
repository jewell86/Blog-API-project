const uuid = require('uuid')

const blogs = [{id: 1, title: "hello world", content: "hey this is my first blog post heyehehehehe"}, {id: 2, title: "second post", content: "hey this is my second blog post heyehehehehe"}, {id: 3, title: "third post", content: "hey this is my third blog post heyehehehehe"}, {id: 4, title: "fourth post", content: "hey this is my fourth blog post heyehehehehe"}]

function getAll(){
    return blogs
}

function getOne(id){
    let blog = blogs.find(post => post.id === id)
    console.log(blog)
}

function create(title, content){
    const post = { id: uuid(), title, content }
    blogs.push(post)
    return blogs
}

function update(id, title, content){
    const post = blogs.find(post => post.id === id)
    post.title = title
    post.content = content
    return post
}

function deleteOne(id){
    const post = blogs.find(post => post.id === id)
    const index = blogs.indexOf(post)
    blogs.slice(index, 1)
    return blogs
    
}

module.exports = { getAll, getOne, create, update, deleteOne }