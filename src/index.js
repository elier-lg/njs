const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/index')
const persons = require('./routes/persons')

// settings
app.set('port', process.env.PORT || 3001)


//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//routes
  app.use(routes)
  app.use('/api/persons', persons)


//starts the server
app.listen(app.get('port'), () => {
  console.log(`Server listens in port ${3001}`)
})