//clear featured post on last delete
//rename variables
//populate first featured post after first post
//close edit for after resubmit
//separate frontend javascript into multiple files
//make error handling
//make pretty
//remove about technology links

const featuredPost = document.querySelector('#featured-post')
const form = document.querySelector('#form')
const createButton = document.querySelector('#create-button')
const allPosts = document.querySelector('#all-posts')

// POPULATE ALL POSTS
function populatePosts() {
axios.get('http://localhost:3000/blogs')
.then(result => {
    const blogs = result.data.data
    const posts = blogs.map(blog => `<a href="#"><li class="list-group-item postz" data-content="${blog.content}" data-id="${blog.id}">${blog.title}</li></a>`).join("")
    document.querySelector('#all-posts').innerHTML = posts
    const featuredBlog = blogs[blogs.length-1]
    firstFeatured(featuredBlog) 
    return result
}) 
    // CHANGE FEATURED POST ON CLICK (COULD GETONE BY ID)
.then(result => {  
    populateFeatured()
})
} 

function firstFeatured(featuredBlog) {
    console.log("featured blog function" + featuredBlog)
    const featuredHTML = `<h5 class="card-title" id="featured-title">${featuredBlog.title}</h5>
    <p class="card-text" id="featured-content">${featuredBlog.content}</p><p class="d-none" id="featured-id">${featuredBlog.id}</p>`
    document.querySelector('#featured-body').innerHTML = featuredHTML
}

function populateFeatured() {
    Array.from(document.querySelectorAll('.postz')).forEach(element => {
        element.addEventListener('click', function(){
            document.querySelector('#featured-body').innerHTML = `<h5 class="card-title" id="featured-title">${element.innerText}</h5>
            <p class="card-text" id="featured-content">${element.dataset.content}</p><p class="d-none" id="featured-id">${element.dataset.id}</p>`
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
            return result
        }) 
        .then(result => {
            populatePosts() 
        })
        .catch(err => {
            console.log('Do not worry, everything is fine.')
        })
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

// DELETE  
const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click', function(ev) {
    ev.preventDefault()
    let id = document.querySelector('#featured-id').innerText
    axios.delete(`http://localhost:3000/blogs/${id}`)
    .then(result => {
        populatePosts()
        // editForm.classList.toggle('d-none')
    })
})
