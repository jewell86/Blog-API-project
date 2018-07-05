//clear featured post on last delete
//rename variables
//populate first featured post after first post
//close edit for after resubmit
//separate frontend javascript into multiple files
//make error handling
//make pretty
//remove about technology links


// POPULATE ALL POSTS
function populatePosts() {
axios.get('http://localhost:3000/blogs')
.then(result => {
    const blogs = result.data.data
    document.querySelector('#all-posts').innerHTML = blogs.map(blog => `<a href="#"><li class="list-group-item postz" data-content="${blog.content}" data-id="${blog.id}">${blog.title}</li></a>`).join("")
    firstFeatured(blogs[blogs.length-1]) 
    featuredSelector()
}) 
} 
//POPULATE FEATURED BLOG
function firstFeatured(featuredBlog) {
    document.querySelector('#featured-body').innerHTML = `<h5 class="card-title" id="featured-title">${featuredBlog.title}</h5>
    <p class="card-text" id="featured-content">${featuredBlog.content}</p><p class="d-none" id="featured-id">${featuredBlog.id}</p>`
}
//POPULATE CLICKABLE BLOG SELECTION
function featuredSelector() {
    Array.from(document.querySelectorAll('.postz')).forEach(element => {
        element.addEventListener('click', function(){
            document.querySelector('#featured-body').innerHTML = `<h5 class="card-title" id="featured-title">${element.innerText}</h5>
            <p class="card-text" id="featured-content">${element.dataset.content}</p><p class="d-none" id="featured-id">${element.dataset.id}</p>`
        })
    }) 
}
populatePosts()

//CREATE POST
document.querySelector('#create-button').addEventListener('click', function() {
    document.querySelector('#create-form').classList.toggle('d-none')
    document.querySelector('#title').value = ""
    document.querySelector('#content').value = ""
})

//SUBMIT CREATE POST
document.querySelector('#create-form').addEventListener('submit', function(event){
    event.preventDefault()
    const title = document.querySelector('#title').value
    const content = document.querySelector('#content').value
    document.querySelector('#create-form').classList.toggle('d-none')      
    axios.post('http://localhost:3000/blogs', { title, content })
        .then(result => {
            populatePosts() 
        })
        .catch(err => {
            console.log('Do not worry, everything is fine.')
        })     
})

// EDIT
document.querySelector('#edit-button').addEventListener('click', function(){
    document.querySelector('#create-form').classList.add('d-none')
    document.querySelector('#edit-form').classList.toggle('d-none')
    const featured = document.querySelector('#featured-title')
    let title = document.querySelector('#edit-title')
    title.value = featured.innerText
    const featuredContent = document.querySelector('#featured-content')
    let content = document.querySelector('#edit-content')
    content.value=featuredContent.innerText
})
document.querySelector('#edit-form').addEventListener('submit', function(ev) {
    ev.preventDefault()
    let title = document.querySelector('#edit-title')
    let content = document.querySelector('#edit-content')
    let id = document.querySelector('#featured-id').innerText
    axios.put(`http://localhost:3000/blogs/${id}`, { title : title.value, content : content.value })
    .then(result => {
        document.querySelector('#edit-form').classList.toggle('d-none')
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
    })
})
