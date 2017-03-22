var express = require('express')
var router = express.Router()
var path = require('path')
var knex = require('../db/knex.js')
var stormpath = require('express-stormpath')
require('dotenv').config()
var client = require('twilio')(process.env.TWI1, process.env.TWI2)
router.get('/:id', (req, res) => {
  var incidentID = req.params.id

  knex('location').where('incident_id', incidentID).select('LAT', 'LONG')
    .then(userLocations => {
      res.send(userLocations)
    })
})


router.get('/endincident/:id', (req, res) => {
  var incidentID = req.params.id

  knex('incident').where('id', incidentID).select('end_timestamp')
    .then(endTime => {
      res.send(endTime[0]["end_timestamp"])
    })
})
router.post('/', stormpath.getUser, (req, res) => {
  var filler = 'test'
  if (req.user){ filler = req.user.email}
  knex.select('id', 'firstname', 'lastname').from('user').where('email', filler)
  .then(result =>{
    if (result.length > 0){
    var fn = result[0].firstname
    var ln = result[0].lastname
    var userID = result[0].id
    console.log(result[0])
  } else {var userID = 1}
    knex('incident').insert({user_id:userID}).returning(['id'])
    .then(results => {
      res.send(results)
      var inc = results[0].id
      knex.select('phone').from('eContact').where('user_id', userID)
      .then(phoneNums=>{
        if (userID !== 1){
        phoneNums.forEach(function (el, ind, arr){
          console.log(el)
          client.sendMessage({
            to: '+1'+el.phone+'',
            from: '+17209034041',
            body: 'Hello from GetMeSafe. \n'+fn+' '+ln+' is feeling unsafe. Track their location at: https://getmesafe.herokuapp.com/trackpath.html?id='+inc
          }, function(err,data){
            if(err)
            console.log(err);
            console.log(res.status(200).send());
          })
        })
      }
      })
    })
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
