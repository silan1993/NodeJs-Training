var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: '<h1>Silan</h1>' ,age :29,height:[5.8,34,74,74]});
});

module.exports = router;
