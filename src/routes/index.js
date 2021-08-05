const express = require('express')
const router  =  express.Router()

//routes
router.get('/', (req, res) => {
  res.send('hi server. Base route is reached')
})

router.get('/persons', (req, res) => {
  res.send([{id:1, fullName: 'Elier Lopez'}, {id:2, fullName: 'Juan Garza'}])
})

module.exports = router