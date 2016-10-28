var fs = require("fs");
var path = require("path");
var sqlite = require("sqlite3").verbose();
var dbpath =  path.resolve(__dirname,"../","public","DB");
console.log("path is " + dbpath);
console.log("hi");
var db = new sqlite.Database(dbpath+"/main.db");

function datastore(){
this.create = function(){
	db.serialize(function(){

		var stm = "CREATE TABLE IF NOT EXISTS devices(id,name,port,initvalue)";
		db.run(stm);

	});
//	db.close();

};
this.init= function (){
	db.serialize(function () {
	//var stm = "insert into devices(id,name,port,initvalue) values (1,'light',7,1)";
	db.run("insert into devices values (?,?,?,?)",[1,'light',7,1]);
//	db.prepare(stm).finalize();
	
	});
//	db.close();
};


this.fetchUser = function (username, pwd ){
	return new Promise(function (resolve,reject){
	var qry='select * from users where name ="'+ username +'" and password ="' + pwd + '"';
	db.all(qry,function(err,row){
		if(err){
			console.log('error while retriving user' + err); 
			reject(err);
		}
		resolve(row);

		});
	});

};

this.fetchDevices = function (username){
	return new Promise(function (resolve,reject){
	var qry='select * from devices where username ="'+ username +'"';
	db.all(qry,function(err,row){
		if(err){
			console.log('error while retriving devices' + err); 
			reject(err);
		}
		resolve(row);

		});
	});

};



this.fetch= function(){
	return  new Promise(function(resolve,reject){
  
get(function(err,row){
	if (err){

		console.log("error occured while fetching " + err);
		reject('error while fetch');
	}
	console.log("first data "+ row[0].name);

	resolve(row);
	});


	});
};	

this.updateDevice= function (device)
{
	return new Promise(function(resolve,reject){
		//var qry = db.prepare("update devices set devicename=?, imgurl=?, port=? where id=?");
		var qry = db.prepare("update devices set devicename=?, port=? where id=?");
		qry.bind(device.devicename, device.port, device.id);
		qry.run(function (err,result){
			if (err)
				reject('error while updating devices');
			resolve(result);

		});

	});
};

this.addDevice = function (device)
{
	return new Promise(function (resolve,reject){
		try{
		var qry = db.prepare("insert into devices values (?,?,?,?,?,?)");
		qry.run('select max(id)+1 from devices',device.devicename, device.imgurl, device.state,device.username,device.port);
		qry.finalize();	
		resolve("success");
	} catch (ex)
	{
			reject("error while adding device" + device);
	}

		//qry.bind(select max(id)+1 from devices,device.devicename, device.imgurl, device.state,device.username,device.port);
		// qry.run(function (err,result){
		// 	if (err)
		// 		reject('error occured while adding data');
		// 	resolve(result);
		// });

	});
};

this.writePin = function (port,value)
{
	return new Promise(function (resolve, reject){

		var qry = db.prepare("update devices set state = ? where port = ?");
		qry.bind(value,port);
		qry.run(function(err,result){
			if (err)
				reject(err);
			resolve(result);
		});
	});
};
this.readPin = function (pin){
	return new Promise(function (resolve,reject){
	var qry='select state from devices where port =' + pin;
	db.all(qry,function(err,row){
		if(err){
			console.log('error while reading pin ' + err); 
			reject(err);
		}
		resolve(row);

		});
	});

};

function get(cb){
	db.all("select * from devices",function(err,row){
console.log("gett" + row[0]);
		cb(err,row);
	});
}

this.delete= function(){
	db.serialize(function () {
	var stm = "delete from devices";
	db.run(stm);
	//db.prepare(stm).finalize();
	});
//	db.close();

};
}
module.exports = new datastore;