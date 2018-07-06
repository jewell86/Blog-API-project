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