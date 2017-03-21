var express = require('express')
var router = express.Router()
var path = require('path')
var knex = require('../db/knex.js')
var stormpath = require('express-stormpath')

router.get('/:id', (req, res) => {
  var incidentID = req.params.id

  knex('location').where('incident_id', incidentID).select('LAT', 'LONG')
    .then(userLocations => {
      res.send(userLocations)
    })
})

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

  if (!!req.body.end_LAT) {
    req.body.end_timestamp = knex.fn.now()
  }

  knex('incident').where('id', incidentID).update(req.body)
    .then(result => {
      res.sendStatus(200).send(result)
    })
})

router.post('/coordinates', (req, res) => {

  knex('location').insert(req.body)
    .then(result => {
      res.send(result)
    })
})




module.exports = router
