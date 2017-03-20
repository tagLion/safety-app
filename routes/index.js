var express = require('express');
var router = express.Router();
var path = require('path')
var knex = require('../db/knex.js')

var stormpath = require('express-stormpath');
/* GET home page. */
router.get('/', stormpath.loginRequired, function(req, res, next) {
  res.send('testing')
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
