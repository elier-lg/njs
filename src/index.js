const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/index')
const persons = require('./routes/persons')

const config = require('./config/index.json')
const AppDAO = require('./dao/appDAO')
const PersonRepository = require('./dao/personRepo')
const dao = new AppDAO(config.dbName)
const personRepo = new PersonRepository(dao)

//create db
personRepo.createTable().then(() => console.log('person Table created'))

// settings
app.set('port', process.env.PORT || config.port)

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