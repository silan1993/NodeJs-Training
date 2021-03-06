
var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
var localStorage = require('localStorage');


/* GET users listing. */
router.get('/', function(req, res, next) {
	
	var token = localStorage.getItem('token');

	var url = 'http://localhost:3000/users?token='+token;
	console.log(url);

	var args = {'Content-Type':'application/json'}
	 var req = client.get(url, args, function (data, response) {
		res.render('users',{users:data.users});
	 })
});

router.get('/new', function(req, res, next) {
	res.render('user-create');
 
});

router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id;


	var url = 'http://localhost:3000/users/'+id;
	var args ={
	 headers: {'Content-Type':'application/json'}
	}
    var req = client.get(url, args, function (data, response) {
    	if(data.users){
			res.render('user-edit',{users:data.users})
		}else{
			res.render('error')
		}
    })
});


router.post('/user-create', function(req, res, next) {
	var newUser = {
		email:req.body.email,
		mobile:req.body.mobile,
		password:req.body.pwd,
		address:req.body.address
	}

	var token = localStorage.getItem('token');

	var url = 'http://localhost:3000/users/user-create?token='+token;
	console.log(url+' url==');
	var args ={
	 headers: {'Content-Type':'application/json'},
	 data:newUser
	}
    var req = client.post(url, args, function (data, response) {
    	if(data.message =='successful'){
			res.redirect('/users')

		}else{
			res.render('error')
		}
    })
});



router.post('/user-edit', function(req, res, next) {

	var newUser = {
		email:req.body.email,
		mobile:req.body.mobile,
		password:req.body.pwd,
		userId: req.body.userId
	}

	var url = 'http://localhost:3000/users/user-edit';

	var args ={
	 headers: {'Content-Type':'application/json'},
	 data:newUser
	}
    var req = client.post(url, args, function (data, response) {
    	if(data.message =='success'){
			res.redirect('/users')

		}else{
			res.render('error')
		}
    })
	
});


router.get('/:id/delete', function(req, res, next) {
	var id = req.params.id;


	var url = 'http://localhost:3000/users/'+id+'/delete';



	var args ={
	 headers: {'Content-Type':'application/json'}
	}
    var req = client.get(url, args, function (data, response) {
    	if(data.message =='success'){
			res.redirect('/users')
		}else{
			res.render('error')
		}
    })

});




module.exports = router;
