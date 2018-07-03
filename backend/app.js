const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const port = 3000 || process.env.PORT
app.disable('x-powered-by')
app.use(morgan('dev'))


const blogsRoutes = require('./src/routes/blogs')
app.use('/blogs', blogsRoutes)

app.use((req, res, next) => {
    const status = 404
    const message = `Could!! not ${req.method} ${req.url}`
    next({ status, message })
})
 
app.use(function( err, req, res, next ){
    const errorMessage = {}
    errorMessage.status = err.status || 500
    errorMessage.message = err.message || 'Something went wrong'
    if(process.env.NODE_ENV !== 'production'){
      errorMessage.stack = err.stack
    }
    res.status(errorMessage.status).send(errorMessage)
})
  
const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)


module.exports = app