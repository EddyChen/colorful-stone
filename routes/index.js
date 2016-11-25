var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/icbc', function(req, res, next) {
  res.render('icbc-index', { title: 'Express' });
});

module.exports = router;
