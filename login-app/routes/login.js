var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/nodejs';


/* GET users listing. */
router.get('/', function(req, res, next) {
	/*mongoClient.connect(url,function(err,db){
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
*/
var isUser =false;
var message = '';
res.render('login',{isUser});

 
});


router.post('/', function(req, res, next) {
	mongoClient.connect(url,function(err,db){
		if (err) throw err;
		var usersData = [];

		var mobile = req.body.mobile;
		var password = req.body.password;
		
		var userData = db.collection('user').find({mobile:mobile,password:password});
		userData.forEach(function(doc){
			usersData.push(doc);
		},function(){
			db.close();
			if(usersData.length >0){
				var isUser = true;
				var message = 'login successful'
			}else{
				var isUser = false;
				var message = 'login failed'
			}
			res.render('login', { isUser ,message});
		})

	})
 
});

module.exports = router;
