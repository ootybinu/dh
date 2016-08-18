var express = require('express');
var http = require('http');
var app = express();

app.use(function (req,resp,next){
	console.log("method" + req.method);
	next();
});

app.use(function (req,res){
	res.writeHead(200,{"Content-Type":"text/plain"});
	res.end("testing...");
});

http.createServer(app).listen(2020);