var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/nodejs';
/* GET users listing. */
router.get('/', function(req, res, next) {
	mongoClient.connect(url,function(err,db){
		if (err) throw err;
		var usersData = [];

		var userData = db.collection('user').find();
		console.log(userData);
		userData.forEach(function(doc){
			usersData.push(doc);
		},function(){
			db.close();
			res.render('users', { users: usersData });
		})

	})

 
});

router.get('/new', function(req, res, next) {
	res.render('user-create');
 
});


router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id;
	mongoClient.connect(url,function(err,db){
		if (err) throw err;
		var usersData = [];
		
		var userData = db.collection('user').find({_id:ObjectId(id)});
		

		userData.forEach(function(doc){
			usersData.push(doc);
		},function(){
			db.close();
			res.render('user-edit', { users: usersData[0] });
		})

	})

 
});


router.post('/user-create', function(req, res, next) {
	var newUser = {
		email:req.body.email,
		mobile:req.body.mobile,
		password:req.body.pwd
	};
	mongoClient.connect(url,function(err,db){
		if (err) throw err;
		db.collection('user').insertOne(newUser,function(error,data){
			res.redirect('/users');
		})
	})
 
});



router.post('/user-edit', function(req, res, next) {
	var id = req.body.userId;
	var newUser = {
		email:req.body.email,
		mobile:req.body.mobile,
		password:req.body.pwd
	};

	mongoClient.connect(url,function(err,db){
		if (err) throw err;
		db.collection('user').findOneAndUpdate({_id:ObjectId(id)},{$set:newUser},function(error,data){
			db.close();
			res.redirect('/users');
		})
	})
 
});


router.get('/:id/delete', function(req, res, next) {
	var id = req.params.id;
	mongoClient.connect(url,function(err,db){
		if (err) throw err;
		
	  db.collection('user').deleteOne({_id:ObjectId(id)},function(error,data){
	  	db.close();
		res.redirect('/users');
	  })

	})
});

module.exports = router;
