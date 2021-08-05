const express = require('express')
const persons = require('../data/persons')
const router  =  express.Router()

router.get('/', (req, res) => {
  console.log(persons)
  res.send(persons)
})

module.exports = router