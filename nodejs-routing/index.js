var http = require('http');
var fs = require('fs');
var app =require('./app');


http.createServer(app.handleRequest).listen(8080);

console.log('my server is running on port no 8080');