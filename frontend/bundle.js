(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

// Create blog posts object/Array
// Validate submit & create alert if fields are not filled out 
// Add each blog post to the blog list & make clickable
// Populate latest blog post as featured
// Allow each blog post to appear as featured upon click
// Allow each blog post to be edited
// Allow each blog post to be deleted

const featuredPost = document.querySelector('#single-post')
const form = document.querySelector('#form')
const createButton = document.querySelector('#create-button')
const allPosts = document.querySelector('#all-posts')

axios.get('http://localhost:3000/blogs')
.then(result => {
    // POPULATE ALL POSTS
    const blogs = result.data.data
    const posts = blogs.map(blog => `<a href="#"><li class="list-group-item postz" data-content="${blog.content}" data-id="${blog.id}">${blog.title}</li></a>`).join("")
    document.querySelector('#all-posts').innerHTML = posts
    // POPULATE FEATURED POST
    let featuredBlog = blogs[blogs.length-1]
    let featuredPost = `<h5 class="card-title" id="featured-title">${featuredBlog.title}</h5>
    <p class="card-text" id="featured-content">${featuredBlog.content}</p>
    <a href="#" class="btn btn-primary">Edit</a>
    <a href="#" class="btn btn-primary">Delete</a>`
    document.querySelector('#featured-body').innerHTML = featuredPost
    // CHANGE FEATURED POST ON CLICK
    const children = document.querySelectorAll('.postz')
    Array.from(children).forEach(element => {
        element.addEventListener('click', function(){
            console.log(element.dataset)
            document.querySelector('#featured-body').innerHTML = `<h5 class="card-title" id="featured-title">${element.innerText}</h5>
            <p class="card-text" id="featured-content">${element.dataset.content}</p>
            <a href="#" class="btn btn-primary">Edit</a>
            <a href="#" class="btn btn-primary">Delete</a>`
        })
      })
  })

 


createButton.addEventListener('click', function(){
    featuredPost.classList.toggle('d-none')
    form.classList.toggle('d-none')
})

form.addEventListener('submit', function(event){
    event.preventDefault()
    const title = document.querySelector('#title').value
    const content = document.querySelector('#content').value
    axios.post('http://localhost:3000/blogs', { title, content })
        .then(function(res){
            axios.get('http://localhost:3000/blogs', { query : limit=5 })
                .then(result => {
                    const blogs = result.data.data
                    const items = blogs.map(blog => `<li>${blog.title}</li> <li>${blog.content}</li>`).join("")
                    document.querySelector('ul').innerHTML = items
                })
                .catch(err => {
                    console.log('Do not worry, everything is fine.')
                })
        })
        title=""
        content=""
})

console.log("hello from main.js")
},{}]},{},[1]);
