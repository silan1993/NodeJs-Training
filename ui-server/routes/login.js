var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var localStorage = require('localStorage');

router.get('/', function(req, res, next) {

var isUser =false;
var message = '';
res.render('login',{isUser});
 
});

router.post('/', function(req, res, next) {

	var data = {
		mobile :req.body.mobile,
		password: req.body.password
	}
	var args ={
	 headers: {'Content-Type':'application/json'},
	 data:data
	}

	var url = 'http://localhost:3000/login';

    var req = client.post(url, args, function (data, response) {
    	if(data.message =='success'){
    		localStorage.setItem('token' ,data.token);
			res.redirect('/users')
		}else{
			res.render('error')
		}
    })

})

module.exports = router;
