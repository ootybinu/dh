var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var gpio = require('rpi-gpio');
var app = express();

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(function (req,resp,next){
	console.log("method" + req.method);
	next();
});

app.get("/", function(req,res){
	gpio.setup(7,gpio.DIR_OUT , on);
	res.render("index");
});
app.get("/on",function (req,res){
	//gpio.setup(7,gpio.DIR_OUT , on);
on();
	res.render("on");
});

app.get("/off",function (req,res){
	//gpio.setup(7,gpio.DIR_OUT , off);
off();
	res.render("off");
});

app.get("/stop",function (req,res){
clean();
	res.render("index");
});

function on()
{
gpio.write(7,'0', function(err){if (err) throw err;
console.log("on..");
});
}

function off()
{
gpio.write(7,'1', function(err){if (err) throw err;
console.log("off..");
});
}

function clean(){
gpio.destroy(function(){console.log("closed now..");});

}
function write(data){

gpio.setup(7,gpio.DIR_OUT , on);

/*
gpio.setup(7,gpio.DIR_OUT,function (){
	gpio.write(7,data,function (err){
		if(err) throw err;
		console.log("written" + data);})
});
*/
}


// app.use(function (req,res){
// 	res.writeHead(200,{"Content-Type":"text/plain"});
// 	res.end("testing...");
// });

http.createServer(app).listen(2020);