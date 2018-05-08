var url = require('url');
var fs = require('fs');

module.exports = {
	handleRequest : function (req,res){
		res.writeHead(200,{'Content-Type' :'text/html'});
		var path = url.parse(req.url).pathname;  // /user or /login. /
		switch(path){
			case '/' :renderHtml('./index.html',res)
			break;
			case '/login': renderHtml('./login.html',res)
			break;
			default: res.write('path not defined')
		}
	}
}


 function renderHtml (path,res){
 	fs.readFile(path,null,function(err,data){
 		
 		if(err){
 			res.writeHead(404);
 			res.write('path not defined');
 			res.end();
 		}else{
 			res.write(data);
			res.end();
 		}
 	})
 }