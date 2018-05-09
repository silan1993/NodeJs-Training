var http = require('http');
var fs = require('fs');
var app =require('./external/app');


function onRequest(req,res){
	res.writeHead(200,{'Content-Type' :'text/plain'});

	fs.readFile('./index.html',null,function(error,data){
		if(error == null){
			res.write(data);
			res.end();
		}else{
			res.writeHead(404);
			res.write('<h1> File Not Found </h1>')
			res.end();
		}
	});
}


http.createServer(onRequest).listen(8080);

console.log('my server is running on port no 8080');