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
var session = require('express-session');
var cp = require('cookie-parser');
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(logger("dev"));
//app.use(cp);
app.use(session({secret:'ardra'}));

var sess;
//app.use(express.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));
app.use(express.static('public'));

//middleware logging
app.use(function (req,resp,next){
	console.log("method" + req.method);
	next();
	});
//Initialization

//routes
app.get("/", function(req,res){
		sess = req.session;
		if (sess.user)
		{
			res.redirect('/home');
		}else
		{
		res.redirect('/login');

		}

	}); // root

app.get("/login",function (req,res) {
	res.render("login");
}); //login get

app.post("/login", function (req,res) {
	var user= req.body.username;
	var pwd = req.body.password;
	var result={};
	if (user =='admin')
	{
		req.session.user = 'admin';
		result.flag='success';}
		else{
			result.flag='failure';
		}
	res.json(result);	

}); //login post 

app.get("/home", function (req,res) {
	res.render("home");
}); //home get

app.get("/dbinit",function(req,res){
	//	datastore.create();
	//datastore.init();
	//datastore.delete();
	datastore.fetch().then (function(result){
	console.log(result);
	res.writeHead(200,{"Content-Type":"text/plain"});
	res.end("<h1> ans is " +result[0].name + "</h1>");


	}).catch(function(err){
console.log("error occured");
	res.writeHead(200,{"Content-Type":"text/plain"});
	res.end("error occured");

	});

	 }); //dbinit

http.createServer(app).listen(2020);
