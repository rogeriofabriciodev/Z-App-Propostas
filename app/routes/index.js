var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Customers Add. */
router.get('/modelo', function(req, res, next) {
  res.render('modelo', { title: 'Express' });
});

module.exports = router;
