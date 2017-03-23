const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js')
const stormpath = require('express-stormpath')


router.post('/', stormpath.loginRequired, (req, res)=>{
  console.log(res.locals.user.email)
  req.body.firstname = res.locals.user.givenName
  req.body.lastname = res.locals.user.surname
  req.body.email = res.locals.user.email
  knex('user').insert(req.body)
  .then(data =>{
    res.send(data)
  })
})
router.get('/myid', stormpath.getUser, (req, res)=>{
  if (!!req.user) {
  knex('user').select('id').where('email', res.locals.user.email)
  .then(function(data){
    console.log(data)
    res.send(data)
  })
} else{
  res.send([{id: 1}])
}
})

router.get('/primary', stormpath.groupsRequired('admin'), (req, res) => {
  knex('user')
    .then(users => {
      res.send(users)
    })
})

router.get('/primary/:id', stormpath.groupsRequired('admin'), (req, res) => {
  var userID = req.params.id
  knex('user').where('id', userID)
    .then(oneUser => {
      res.send(oneUser)
    })
})

router.get('/allecontacts', stormpath.groupsRequired('admin'), (req, res) => {
  knex('eContact')
    .then(allcontacts => {
      res.send(allcontacts)
    })
})

router.get('/econtactbyuser/:id', stormpath.loginRequired, (req, res) => {
  var econtactsForUser = req.params.id
  knex('eContact').where('user_id', econtactsForUser)
    .then(allUserContacts => {
      res.send(allUserContacts)
    })
})

router.get('/econtacts/:id', stormpath.loginRequired, (req, res) => {
  var econtactID = req.params.id
  knex.select('user.id').from('eContact').join('user', 'user.id', 'user_id').where('user.email', res.locals.user.email)
  .then(function(data){
    console.log(data)
  knex('eContact').where('id', econtactID).andWhere('user_id', data[0].id)
    .then(result => {
      res.send(result)
    })
})
})

router.post('/newecontact', stormpath.loginRequired, (req, res) => {
  console.log(res.locals.user.email)
  knex('user').select('id').where('email', res.locals.user.email)
  .then(function(data){
    console.log(data)
    req.body.user_id = data[0].id
    if (req.body.user_id == data[0].id){
      var newFirstName = req.body.firstname
      var newLastName = req.body.lastname
      var newPhone = req.body.phone
      var newEmail = req.body.email
      var newUserID = req.body.user_id

      knex('eContact').insert({user_id:newUserID, firstname:newFirstName, lastname:newLastName, phone:newPhone, email:newEmail}).returning(['id', 'user_id', 'firstname', 'lastname', 'phone', 'email'])
        .then(addedUser => {
          res.send(addedUser)
        })
    } else {
      res.send(404)
    }
  })
  })


router.patch('/updatecontact/:id', stormpath.loginRequired, (req, res) => {
  var patchFirstName = req.body.firstname
  var patchLastName = req.body.lastname
  var patchPhone = req.body.phone
  var patchEmail = req.body.email
  // var patchUserID = req.body.user_id
  var patchContactID = req.params.id

  knex.select('eContact.id').from('eContact').join('user', 'user.id', 'user_id').where('eContact.id', patchContactID).andWhere('user.email', res.locals.user.email)
  .then(function(data){
    if (data.length == 1){
  knex('eContact').update({ firstname:patchFirstName, lastname:patchLastName, phone:patchPhone, email:patchEmail}).where('id', patchContactID)
    .then(result => {
      res.send(200)
    })
  }else {
    res.send(404)
  }
})
})

router.delete('/removecontact/:id', stormpath.loginRequired, (req, res) => {
  knex.select('id').from('user').where('email', res.locals.user.email)
  .then(data=>{
  var deleteUserID = req.params.id
  knex('eContact').where('id', deleteUserID).andWhere('user_id', data[0].id).del()
    .then(result => {
      res.send(200)
    })
    .catch(err=>{
      res.sendStatus(404)
    })
    })
})


module.exports = router
