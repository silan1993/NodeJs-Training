var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

var Employee = require('../models/employeeModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find().then(function(data){
		res.send({ users: data });
	})
 
});

router.get('/new', function(req, res, next) {
	res.send('user-create');
 
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;

	User.findById(id,function(err,data){
		res.status(200).send({users:data});
	})


});


router.post('/user-create', function(req, res, next) {
	var newUser  = new User(req.body);
	console.log(newUser);
	newUser.save().then(function(err,data){
	res.status(200).send({message:'successful'})

	})
});



router.put('/user-edit', function(req, res, next) {
	var id = req.body.userId;
	User.findById(id,function(err ,data){
		data.email = req.body.email;
		data.mobile =req.body.mobile;
		data.password =req.body.password;
		data.save().then(function(data1){
			console.log(data1);
			res.status(200).send({message:'success'});
		});
	})
});


router.get('/:id/delete', function(req, res, next) {
	var id = req.params.id;
	User.findByIdAndRemove(id,function(err,data){
		res.status(200).send({message:'success'});
	})
	
});




module.exports = router;
