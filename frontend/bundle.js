(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const featuredPost = document.querySelector('#single-post')
const form = document.querySelector('#form')
const createButton = document.querySelector('#create-button')
const allPosts = document.querySelector('#all-posts')

function populatePosts() {
axios.get('http://localhost:3000/blogs')
.then(result => {
    // POPULATE ALL POSTS
    const blogs = result.data.data
    const posts = blogs.map(blog => `<a href="#"><li class="list-group-item postz" data-content="${blog.content}" data-id="${blog.id}">${blog.title}</li></a>`).join("")
    document.querySelector('#all-posts').innerHTML = posts
    return blogs
})
    // POPULATE FEATURED POST
.then(result => { 
    let featuredBlog = result[result.length-1]
    console.log('this is featured post' + featuredBlog)
    let featuredPost = `<h5 class="card-title" id="featured-title">${featuredBlog.title}</h5>
    <p class="card-text" id="featured-content">${featuredBlog.content}</p><p class="d-none" id="featured-id">${featuredBlog.id}</p>`
    document.querySelector('#featured-body').innerHTML = featuredPost
    return result
}) 
    // CHANGE FEATURED POST ON CLICK (COULD GETONE BY ID)
.then(result => {   
    Array.from(document.querySelectorAll('.postz')).forEach(element => {
        element.addEventListener('click', function(){
            document.querySelector('#featured-body').innerHTML = `<h5 class="card-title" id="featured-title">${element.innerText}</h5>
            <p class="card-text" id="featured-content">${element.dataset.content}</p><p class="d-none" id="featured-id">${element.dataset.id}</p>`
        })
    }) 
})
} 
populatePosts()
//CREATE
createButton.addEventListener('click', function(){
    // editForm.classList.toggle('d-none')
    // featuredPost.classList.toggle('d-none')
    form.classList.toggle('d-none')
    const title = document.querySelector('#title')
    const content = document.querySelector('#content')
    title.value = ""
    content.value = ""
})
form.addEventListener('submit', function(event){
    event.preventDefault()
    const title = document.querySelector('#title')
    const content = document.querySelector('#content')
    axios.post('http://localhost:3000/blogs', { title : title.value, content : content.value })
        .then(result => {
            axios.get('http://localhost:3000/blogs')
        }) 
        .then(result => {
            populatePosts()    
        })
        .catch(err => {
            console.log('Do not worry, everything is fine.')
        })
        // populatePosts()
        featuredPost.classList.toggle('d-none')
        form.classList.toggle('d-none')      
})

// EDIT
document.querySelector('#edit-button').addEventListener('click', function(){
    // featuredPost.classList.toggle('d-none')
    form.classList.add('d-none')
    editForm.classList.toggle('d-none')
    const featured = document.querySelector('#featured-title')
    let title = document.querySelector('#edit-title')
    title.value = featured.innerText
    const featuredContent = document.querySelector('#featured-content')
    let content = document.querySelector('#edit-content')
    content.value=featuredContent.innerText
})

const editSubmit = document.querySelector('#edit-submit')
const editForm = document.querySelector('#edit-form')

editForm.addEventListener('submit', function(ev) {
    ev.preventDefault()
    let title = document.querySelector('#edit-title')
    let content = document.querySelector('#edit-content')
    let id = document.querySelector('#featured-id').innerText
    console.log(id)
    axios.put(`http://localhost:3000/blogs/${id}`, { title : title.value, content : content.value })
    .then(result => {
        editForm.classList.toggle('d-none')
        populatePosts()
    }) 
})

// // // DELETE  
const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click', function(ev) {
    console.log('delete')
    ev.preventDefault()
    let id = document.querySelector('#featured-id').innerText
    axios.delete(`http://localhost:3000/blogs/${id}`)
    .then(result => {
        populatePosts()
    })
})

console.log("hello from main.js")
},{}]},{},[1]);
