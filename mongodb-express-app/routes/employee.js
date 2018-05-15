var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('employee', { name: 'Silan' });
});

router.get('/:id', function(req, res, next) {
  res.render('employeeDetail', { id: req.params.id,age:req.params.age});
});


module.exports = router;
