var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/nodejs';
/* GET users listing. */
router.get('/', function(req, res, next) {

	mongoClient.connect(url,function(err,db){
		if (err) throw err;
		var usersData = [];

		var userData = db.collection('user').find();
		//console.log(userData);
		userData.forEach(function(doc){
			usersData.push(doc);
		},function(){
			db.close();
			console.log(usersData);
			res.render('users', { users: JSON.stringify(usersData) });
		})

	})

	//
 
});

router.get('/new', function(req, res, next) {
	res.render('user-create');
 
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
			res.redirect('/users/new');
		})
	})
 
});

module.exports = router;
