var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Customers Add. */
router.get('/customersadd', function(req, res, next) {
  res.render('customersAdd', { title: 'Express' });
});


/* GET Customers List. */
router.get('/customerslist', function(req, res, next) {
  res.render('customersList', { title: 'Express' });
});

module.exports = router;
