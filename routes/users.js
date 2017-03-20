const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js')

router.get('/primary', (req, res) => {
  knex('user')
    .then(users => {
      res.send(users)
    })
})

router.get('/primary/:id', (req, res) => {
  var userID = req.params.id
  knex('user').where('id', userID)
    .then(oneUser => {
      res.send(oneUser)
    })
})

router.get('/allecontacts', (req, res) => {
  knex('eContact')
    .then(allcontacts => {
      res.send(allcontacts)
    })
})

router.get('/econtactbyuser/:id', (req, res) => {
  var econtactsForUser = req.params.id
  knex('eContact').where('user_id', econtactsForUser)
    .then(allUserContacts => {
      res.send(allUserContacts)
    })
})

router.get('/econtacts/:id', (req, res) => {
  var econtactID = req.params.id
  knex('eContact').where('id', econtactID)
    .then(result => {
      res.send(result)
    })
})

router.post('/newecontact', (req, res) => {
  var newFirstName = req.body.firstname
  var newLastName = req.body.lastname
  var newPhone = req.body.phone
  var newEmail = req.body.email
  var newUserID = req.body.user_id

  knex('eContact').insert({user_id:newUserID, firstname:newFirstName, lastname:newLastName, phone:newPhone, email:newEmail}).returning(['id', 'user_id', 'firstname', 'lastname', 'phone', 'email'])
    .then(addedUser => {
      res.send(addedUser)
    })
})

router.patch('/updatecontact', (req, res) => {
  var patchFirstName = req.body.firstname
  var patchLastName = req.body.lastname
  var patchPhone = req.body.phone
  var patchEmail = req.body.email
  // var patchUserID = req.body.user_id
  var patchContactID = req.body.id

  knex('eContact').where('id', patchContactID).update({ firstname:newFirstName, lastname:newLastName, phone:newPhone, email:newEmail})
    .then(result => {
      res.send(200)
    })
})

router.delete('/removecontact/:id', (req, res) => {
  var deleteUserID = req.params.id
  knex('eContact').where('id', deleteUserID).del()
    .then(result => {
      res.send(200)
    })
})


module.exports = router
