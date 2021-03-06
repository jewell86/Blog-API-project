(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

//featured after edit
//readme!
//figure out installation & how to upload
const templates = require('./templates')

// POPULATE ALL POSTS
function populatePosts() {
axios.get('http://localhost:3000/blogs')
.then(result => {
    const blogs = result.data.data
    document.querySelector('#all-posts').innerHTML = blogs.map(templates.allPostsTemplate).join("") 
    firstFeatured(blogs[blogs.length-1])   
}) 
.then(result => {
    featuredSelector()
})
.catch(err => {
    console.log('Get request Failed')
})
} 

//POPULATE FEATURED BLOG
function firstFeatured(featuredBlog) {
    if(!featuredBlog){
        document.querySelector('#featured-body').innerHTML = ""
    }else{
        document.querySelector('#featured-body').innerHTML = templates.featuredTemplate(featuredBlog)
        const newPost = Array.from(document.querySelectorAll('.postz'))
        newPost[newPost.length -1].classList.add('active')
    }
}

//POPULATE CLICKABLE BLOG SELECTION
function featuredSelector() {
    Array.from(document.querySelectorAll('.postz')).forEach(element => {
        element.addEventListener('click', function(ev) {
            ev.preventDefault()
            Array.from(document.querySelectorAll('.postz')).forEach(element => {
                element.classList.remove('active')
            })
            element.classList.add('active')
            document.querySelector('#featured-body').innerHTML = templates.clickFeaturedDisplay(element)
        })
    }) 
}
populatePosts()

//CREATE POST
document.querySelector('#create-button').addEventListener('click', function(ev) {
    ev.preventDefault()
    document.querySelector('#edit-form').classList.add('d-none')
    document.querySelector('#create-form').classList.toggle('d-none')
    document.querySelector('#title').value = ""
    document.querySelector('#content').value = ""
})
document.querySelector('#create-form').addEventListener('submit', function(ev) {
    ev.preventDefault()
    document.querySelector('#edit-form').classList.add('d-none')
    const title = document.querySelector('#title').value
    const content = document.querySelector('#content').value
    document.querySelector('#create-form').classList.toggle('d-none')      
    axios.post('http://localhost:3000/blogs', { title, content })
    .then(result => {
        populatePosts() 
    })
    .catch(err => {
        console.log('Post request failed')
    })     
})

// EDIT
document.querySelector('#edit-button').addEventListener('click', function(ev){
    ev.preventDefault()
    document.querySelector('#create-form').classList.add('d-none')
    document.querySelector('#edit-form').classList.toggle('d-none')
    document.querySelector('#edit-title').value = document.querySelector('#featured-title').innerText
    document.querySelector('#edit-content').value = document.querySelector('#featured-content').innerText
})
document.querySelector('#edit-form').addEventListener('submit', function(ev) {
    ev.preventDefault()
    let title = document.querySelector('#edit-title').value
    let content = document.querySelector('#edit-content').value
    let id = document.querySelector('#featured-id').innerText
    axios.put(`http://localhost:3000/blogs/${id}`, { title, content })
    .then(result => {
        document.querySelector('#edit-form').classList.toggle('d-none')
        populatePosts()
    })
    .catch(err => {
        console.log('Put request failed')
    }) 
})

// DELETE  
document.querySelector('#delete-button').addEventListener('click', function(ev) {
    ev.preventDefault()
    document.querySelector('#edit-form').classList.add('d-none')
    const id = document.querySelector('#featured-id').innerText
    axios.delete(`http://localhost:3000/blogs/${id}`)
    .then(result => {
        populatePosts()
    })
    .catch(err => {
        console.log('Delete request failed')
    })
})


},{"./templates":2}],2:[function(require,module,exports){
function allPostsTemplate(blog){
   return `<a href="#"><li class="list-group-item postz" data-content="${blog.content}" data-id="${blog.id}">${blog.title}</li></a>`
} 

function featuredTemplate(featuredBlog){
   return `<h5 class="card-title" id="featured-title">${featuredBlog.title}</h5>
        <p class="card-text" id="featured-content">${featuredBlog.content}</p><p class="d-none" id="featured-id">${featuredBlog.id}</p>`
}

function clickFeaturedDisplay(element){
   return `<h5 class="card-title" id="featured-title">${element.innerText}</h5>
    <p class="card-text" id="featured-content">${element.dataset.content}</p><p class="d-none" id="featured-id">${element.dataset.id}</p>`
}

module.exports ={ allPostsTemplate, featuredTemplate, clickFeaturedDisplay }
},{}]},{},[1]);
