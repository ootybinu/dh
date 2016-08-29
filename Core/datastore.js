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
	// var result;
	// db.serialize(function(){
	// 	console.log("fetching from devices");
	// 	db.each('select * from devices',function (err,row) {
	// 		if (err){console.log("error is " + err);}
	// 		console.log(row);
	// 		var device = row;
	// 	result.push(device.name);
	// 	console.log("added .." + device.name);
	// });

	// });

//	db.close();+

//console.log("return value is  " + result);
//	return result;
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