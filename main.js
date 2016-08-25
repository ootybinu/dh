var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var datastore = require ('./Core/datastore');
//var device = require('./Core/device');
var device = require('./core/deviceDummy');

var app = express();

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(logger("dev"));

//app.use(express.session());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

//middleware logging
app.use(function (req,resp,next){
	console.log("method" + req.method);
	next();
	});
//Initialization

//routes
app.get("/", function(req,res){
	}); // root

app.get("/dbinit",function(req,res){
		datastore.create();
	datastore.init();

	res.writeHead(200,{"Content-Type":"text/plain"});
	res.end("testing...");

	 }); //dbinit

http.createServer(app).listen(2020);