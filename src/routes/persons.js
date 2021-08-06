const express = require('express')
const _ = require('underscore')
const PersonRepository = require('../dao/personRepo')
const AppDAO = require('../dao/appDAO')
const config = require('../config/index.json')
const router = express.Router()
const dao = new AppDAO(`${config.dbName}`)
const personRepo = new PersonRepository(dao)

router.get('/', (req, res) => {
  personRepo.getAll().then(data => res.json(data))
})

router.get('/find/:name', (req, res) => {
  personRepo.findByName(req.params.name).then(data => res.json(data))
})

router.post('/', (req, res) => {
  const { body: person } = req
  if (!person.id)
    personRepo.create(person).then(data => {
      const newPerson = { ...data, ...person }
      res.json(newPerson)
    })
  else
    personRepo.update(person).then(() => {
      res.json()
    })
})

router.post('/bulk', (req, res) => {
  const { body: persons } = req
    personRepo.createList(persons).then(data => {
      // const newPerson = { ...data, ...person }
      res.json(data)
    })
})

router.delete('/:id', (req, res) => {
  personRepo.delete(req.params.id).then(() => {
    res.json()
  })
})

module.exports = router