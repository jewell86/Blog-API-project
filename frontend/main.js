
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
    <p class="card-text" id="featured-content">${featuredBlog.content}</p>`
    document.querySelector('#featured-body').innerHTML = featuredPost
    // CHANGE FEATURED POST ON CLICK
    const children = document.querySelectorAll('.postz')
    Array.from(children).forEach(element => {
        element.addEventListener('click', function(){
            console.log(element.dataset)
            document.querySelector('#featured-body').innerHTML = `<h5 class="card-title" id="featured-title">${element.innerText}</h5>
            <p class="card-text" id="featured-content">${element.dataset.content}</p>`
        })
      })
  })

  

  createButton.addEventListener('click', function(){
    featuredPost.classList.toggle('d-none')
    form.classList.toggle('d-none')
  })

form.addEventListener('submit', function(event){
    event.preventDefault()
    console.log('submit')
    const title = document.querySelector('#title')
    const content = document.querySelector('#content')
    axios.post('http://localhost:3000/blogs', { title : title.value, content : content.value })
        .then(function(res){
            axios.get('http://localhost:3000/blogs')
            .then(result => {
                // POPULATE ALL POSTS
                const blogs = result.data.data
                const posts = blogs.map(blog => `<a href="#"><li class="list-group-item postz" data-content="${blog.content}" data-id="${blog.id}">${blog.title}</li></a>`).join("")
                document.querySelector('#all-posts').innerHTML = posts
                // POPULATE FEATURED POST
                let featuredBlog = blogs[blogs.length-1]
                let featuredPost = `<h5 class="card-title" id="featured-title">${featuredBlog.title}</h5>
                <p class="card-text" id="featured-content">${featuredBlog.content}</p>`
                document.querySelector('#featured-body').innerHTML = featuredPost
                // CHANGE FEATURED POST ON CLICK
                const children = document.querySelectorAll('.postz')
                Array.from(children).forEach(element => {
                    element.addEventListener('click', function(){
                        console.log(element.dataset)
                        document.querySelector('#featured-body').innerHTML = `<h5 class="card-title" id="featured-title">${element.innerText}</h5>
                        <p class="card-text" id="featured-content">${element.dataset.content}</p>`
                    })
                  })
                // EDIT
                const editButton = document.querySelector('#edit-button')
                // DELETE  
                
                const deleteButton = document.querySelector('#delete-button')
                console.log(deleteButton)
                deleteButton.addEventListener('click', function(ev){
                    ev.preventDefault()
                    let id = featuredPost.dataset.id
                    console.log(id)
                })

              })
                .catch(err => {
                    console.log('Do not worry, everything is fine.')
                })
        })
        featuredPost.classList.toggle('d-none')
        form.classList.toggle('d-none')
       
})



console.log("hello from main.js")