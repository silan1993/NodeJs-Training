var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

var Employee = require('../models/employeeModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find().then(function(data){
		res.render('users',{ users: data });
	})
 
});

router.get('/new', function(req, res, next) {
	res.render('user-create');
 
});

router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id;
	User.findById(id,function(err,data){

		console.log(data);
		console.log(err);

		res.render('user-edit',{users:data});
	})

});


router.post('/user-create', function(req, res, next) {
	var newUser  = new User();
	newUser.email = req.body.email;
	newUser.mobile = req.body.mobile;
	newUser.password = req.body.pwd;
	newUser.address = req.body.address;

	newUser.save();
	res.redirect('/users')

});



router.post('/user-edit', function(req, res, next) {
	var id = req.body.userId;
	User.findById(id,function(err ,data){

		data.email = req.body.email;
		data.mobile =req.body.mobile;
		data.password =req.body.pwd;
		data.save();
		res.redirect('/users');
	})
});


router.get('/:id/delete', function(req, res, next) {
	var id = req.params.id;

	User.findByIdAndRemove(id,function(err,data){
		res.redirect('/users');
	})
	
});




module.exports = router;
