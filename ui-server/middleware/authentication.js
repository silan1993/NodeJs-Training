var localStorage = require('localStorage');

module.exports.checkAuthentication = function checkAuthentication(req,res,next) {
	var token = localStorage.getItem('token');

	
	if(token && token !=null){
		req.oldUrl = req.originalUrl;
		console.log(req.get('User-Agent'));
		//res.redirect(req.originalUrl)
		next();
	}else{
		res.redirect('/login')
	}
}
