var express = require('express');
var router = express.Router();
var path = require('path')
var knex = require('../db/knex.js')

var stormpath = require('express-stormpath');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../public/index.html')
});
router.get('/addecontact.html', stormpath.loginRequired, function(req, res, next) {
  res.sendFile('../public/addecontact.html')
});
router.get('/econtact.html', stormpath.loginRequired, function(req, res, next) {
  res.sendFile('../public/econtact.html')
});
router.get('/isloggedin', stormpath.getUser, (req, res) =>{
    if(req.user){
      // res.send(res.locals.user.email)
      res.send(req.user)
    }else {
      res.send(false)
    }
})
module.exports = router;
