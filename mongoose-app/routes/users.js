var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var url = 'mongodb://localhost:27017/nodejs';
var Schema = mongoose.Schema;

mongoose.connect(url);

var userSchema = new Schema({
	name: String,
	mobile: {type:String,unique:true},
	password:String,
	email:String
})
var User =  mongoose.model('user',userSchema);

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


router.get('/login', function(req, res, next) {

var isUser =false;
var message = '';
res.render('login',{isUser});
 
});

router.post('/login', function(req, res, next) {
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
