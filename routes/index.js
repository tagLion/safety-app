var express = require('express');
var router = express.Router();
var path = require('path')

var stormpath = require('express-stormpath');
/* GET home page. */
router.get('/', stormpath.loginRequired, function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test', stormpath.loginRequired, (req, res) =>{
  res.sendFile(path.join(__dirname + './public/test.html'))
})
module.exports = router;
