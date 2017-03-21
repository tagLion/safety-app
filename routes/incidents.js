var express = require('express')
var router = express.Router()
var path = require('path')
var knex = require('../db/knex.js')
var stormpath = require('express-stormpath')

router.get('/')

router.post('/', (req, res) => {
  var userID = req.body.user_id
  knex('incident').insert({user_id:userID}).returning(['id'])
    .then(result => {
      res.send(result)
    })
})

router.patch('/:id', (req, res) => {
  var incidentID = req.params.id
  var startLat = req.body.start_LAT
  var startLong = req.body.start_LONG

  knex('incident').where('id', incidentID).update({req.body})
    .then(result => {
      res.sendStatus(200).send(result)
    })
})

router.post('/coordinates', (req, res) => {

  knex('location').insert({req.body})
    .then(result => {
      res.sent(result)
    })
})




module.exports = router
