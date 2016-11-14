var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var debug = require('debug')('main');
var bodyParser = require('body-parser');
var fs = require('fs');
var datastore = require ('./Core/datastore');
//var device = require('./Core/my-gpio');
var device = require('./Core/deviceDummy');
//var logcontroller = require('./controllers/logcontroller')
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

//middleware authentication 
app.use (function (req,res,next){

next();
});

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
		}
		else
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
	datastore.fetchUser(user,pwd).then(
		function(data){
			console.log(data);
			if (data== null || data==undefined || data.length ==0 )
			{
				result.flag='failure';
				res.json(result);
			}else{
				result.user = user;
				result.key = 'test';
				req.session.user = 'admin';
				result.flag='success';
				result.data = data;
				res.json(result);
		}
		},function(err){
			result.flag='failure';
			res.json(result);
		}); 
}); //login post 

app.get("/home", function (req,res) {
	res.render("home");
}); //home get

app.post('/home/getdevices',function(req,res){
debug('getting devices..');
	var user = req.body.username;
	datastore.fetchDevices(user).then
	(function(data){
			// Updating the current state of the device
			var selected = [];
			data.forEach(function (item){
				debug('device : %s on port %d',item.devicename,item.port);
				//device.initChannel(item.port);
				device.read(item.port,function (err,value){
					if (err)
						{
							console.log("error while reading value for "+ item.port);
							selected.push(item);
							}
					item.state =value;
					console.log(item.devicename + ">>" + item.state);
					selected.push(item);
					if (selected.length >= data.length)
					{
						res.json(data);
					}
				});
				
			});	
		//res.json(data);
	},function (err){
		res.json(err);
	});
});

app.post('/home/setvalue',function(req,res){
	var result ={};
	try {
		var item = req.body.device;
		var val = req.body.value;
debug('item :%s & value: %s',item.port,val);
		device.write(item.port,val,function (err,data){
		result.flag="success";
		res.json(result);

	});
	}
	catch(e)
	{
		console.log("Exception while writing data " + e);
		//result.flag="failure";
		res.writeHead(500,{"Content-Type":"text/plain"});
		res.end("Error occurec while writing value");
	}
//	res.json(result);

});

app.get('/configure/index',function (req,res){
	res.render("configindex")
}); //config-list

app.post('/config/getdevices',function(req,res){
	debug('starting configure get devices');
	var user = req.body.username;
	datastore.fetchDevices(user).then(
		function(data){
			res.json(data);	
		},function(errdata){
			debug('error occured ' + errdata);
			res.json(null);
		}
		); 
});

app.post('/config/updatedevice',function(req,res){
	var device = req.body.device;
	datastore.updateDevice(device).then(
		function(data){
			debug('Update device success!!');
			res.json('{msg:success}');
		},
		function(errdata){
			res.json('{msg:failure}');

		}
		);

}); //config-update device

app.post('/config/deletedevice',function(req,res){
	var device = req.body.device;
	datastore.deleteDevice(device).then(
		function(data){
			debug('Delete device success!!');
			res.json('{msg:success}');
		},
		function(errdata){
			res.json('{msg:failure}');

		}
		);

}); //config-deletedevice

app.post('/config/adddevice',function(req,res){
	var device = req.body.device;
	datastore.addDevice(device).then(
		function(data){
			debug('Device added !');
			res.json('{msg:success}');
		},
		function(errdata){
			res.json('{msg:failure}');

		}
		);

}); //config-deletedevice

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