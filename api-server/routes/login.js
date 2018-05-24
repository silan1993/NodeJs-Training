var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

router.get('/', function(req, res, next) {

var isUser =false;
var message = '';
res.render('login',{isUser});
 
});

router.post('/', function(req, res, next) {
	var mob = req.body.mobile;
	var pwd = req.body.password;

	User.find({mobile : mob,password:pwd}).then(function(data){
		if(data.length >0){
			var isUser = true;
			var message = 'login successful'
		}else{
			var isUser = false;
			var message = 'login failed'
		}
		res.render('login', { isUser ,message});
	})
	
})

module.exports = router;
