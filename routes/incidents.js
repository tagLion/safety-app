var express = require('express')
var router = express.Router()
var path = require('path')
var knex = require('../db/knex.js')
var stormpath = require('express-stormpath')
var shortid = require('shortid')
require('dotenv').config()
var client = require('twilio')(process.env.TWI1, process.env.TWI2)
var api_key = process.env.MGAPIKEY;
var domain = process.env.DOMAIN;
var nodemailer = require('nodemailer');
router.get('/:id/:key', (req, res) => {

  var incidentID = req.params.id
  var key = req.params.key
  console.log(key + incidentID)
  knex('location').where('incident_id', incidentID).join('incident', 'incident.id', 'location.incident_id').andWhere('key', key).select('LAT', 'LONG')
    .then(userLocations => {
      if (userLocations.length > 0){
      res.send(userLocations)
    } else {res.sendStatus(405)}
    })
})


router.get('/:thing/', (req, res) => {
  var incidentID = req.params.thing
console.log(incidentID)
  knex('incident').where('id', incidentID).select('end_timestamp')
    .then(endTime => {
      res.send(endTime[0].end_timestamp)
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
    knex('incident').insert({user_id:userID, key:
    shortid.generate()}).returning(['id', 'key'])
    .then(results => {
      res.send(results)
      var inc = results[0].id
      var key = results[0].key
      console.log(key)
      knex.select('email', 'phone').from('eContact').where('user_id', userID)
      .then(emails=>{
        if (userID !== 1){
          emails.forEach(function(el, ind, arr){
            // var data = {
            //   from: 'GetMeSafe <postmaster@'+process.env.DOMAIN+'>',
            //   to: el.email,
            //   subject: 'GetMeSafe Alert',
            //   text: 'Hello from https://getmesafe.herokuapp.com. \n'+fn+ ' '+ln+' has currently indicated that they are in an unsafe situation and has you listed as an emergency contact. To track their location, visit https://getmesafe.herokuapp.com/trackpath.html?id='+inc+'&key='+key
            // };
            // mailgun.messages().send(data, function (error, body) {
            //   console.log(body);
            //   if(!error)
            //     console.log('email sent')
            //   else {
            //     console.log('email error')
            //   }
            // });
            var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GACC, // Your email id
            pass: process.env.GPASS // Your password
        }
      })
        var mailOptions = {
    from: process.env.GACC, // sender address
    to: el.email, // list of receivers
    subject: 'GetMeSafe Alerts', // Subject line
    text: 'Hello from https://getmesafe.herokuapp.com. \n'+fn+ ' '+ln+' has currently indicated that they are in an unsafe situation and has you listed as an emergency contact. To track their location, visit https://getmesafe.herokuapp.com/trackpath.html?id='+inc+'&key='+key

};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('mail error')
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
          })


        emails.forEach(function (el, ind, arr){
          console.log(el)
          client.sendMessage({
            to: '+1'+el.phone+'',
            from: '+17209034041',
            body: 'Hello from https://getmesafe.herokuapp.com. \n'+fn+ ' '+ln+' has currently indicated that they are in an unsafe situation and has you listed as an emergency contact. To track their location, visit https://getmesafe.herokuapp.com/trackpath.html?id='+inc+'&key='+key
          }, function(err,data){
            if(err){
            console.log('sms error');
          } else {
            console.log('sms success')
          }
          })
        })
      }
      })
    })
  })
})

router.patch('/:id/:key', (req, res) => {
  var incidentID = req.params.id
  var key = req.params.key

  if (req.body.end_LAT) {
    req.body.end_timestamp = knex.fn.now()
  }

  knex('incident').where('key', key).update(req.body)
    .then(result => {
      res.sendStatus(200)
    })
  })


router.post('/coordinates/:id/:key', (req, res) => {
 var id = req.params.id
 var key = req.params.key
 knex.select('incident.id').from('incident').where('incident.key', key)
 .then(data=>{
   req.body.incident_id = data[0].id
  knex('location').insert(req.body)
    .then(result => {
      res.send(result)
    })
})
})




module.exports = router
