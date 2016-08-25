var fs = require("fs");
var path = require("path");
var sqlite = require("sqlite3").verbose();
console.log(path.resolve(__dirname));
var db = new sqlite.Database(path.resolve(__dirname,"./public/DB/main.db"));

function datastore(){
this.create = function(){
var stm = "CREATE TABLE IF NOT EXISTS devices(id,name,port,initvalue)";
db.run(stm);
// if (!fs.exists(fname))
// 	{
// 		fs.create(fname);

// 	}

}
this.init= function (){
	var stm = "insert into devices values (1,'light',7,1)";
	db.run(stm);
}
	
}
module.exports = new datastore;