var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

var isUser =false;
var message = '';
res.render('login',{isUser});
 
});

router.post('/', function(req, res, next) {
	var mob = req.body.mobile;
	var pwd = req.body.password;

	
	
})

module.exports = router;
