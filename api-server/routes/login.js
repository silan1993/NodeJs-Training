var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var jwt = require('jsonwebtoken')


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
		var token = jwt.sign(
		    {user: data[0]},
		    'secrete'
		  )
		console.log(token+' token===');
		res.status(200).send({token : token,message:'success'});
		}else{
			var isUser = false;
			var message = 'login failed'
		}
		
	})
	
})

module.exports = router;
