
var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var url = 'http://localhost:3000/users';
	var args = {'Content-Type':'application/json'}
	 var req = client.get(url, args, function (data, response) {
		res.render('users',{users:data.users	});
	 })
});

router.get('/new', function(req, res, next) {
	res.render('user-create');
 
});

router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id;
	

});


router.post('/user-create', function(req, res, next) {
	var newUser = {
		email:req.body.email,
		mobile:req.body.mobile,
		password:req.body.pwd,
		address:req.body.address
	}
	var url = 'http://localhost:3000/users/user-create';

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
	var id = req.body.userId;
	
});


router.get('/:id/delete', function(req, res, next) {
	var id = req.params.id;
});




module.exports = router;
