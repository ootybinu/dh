var datastore = require ('./datastore');
function deviceDummy()
{

this.write = function(pin,value,cb){
	var wvalue = value ?1:0;
	datastore.writePin(pin,wvalue).then(
		function(data)
		{
			console.log("dummy pin :" + wvalue + "written at device " + pin);
			return cb(null, data);
		}, 
		function(errdata)
		{
			console.log("error while writing data" + errdata);
			cb(errdata);
		}
		); 

// gpio.write(pin,value, function (err)
// 	{if (err) throw err;
// 		console.log( value + "written to " + pin);
// 	});

}; 
this.read = function(pin,cb){

datastore.readPin(pin).then(
	function(data){
			console.log("the dummy value given back is " + data[0].state + ' at device ' + pin);
		return cb(null, data[0].state);
	},
	function(errdata){
		console.log("error occured while reading " + pin + errdata);
		return cb(errdata);
	});
	
// gpio.read(pin,function(err,value){
// 	if (err) throw err;
// 	console.write(value " read from pin "+ pin);
// 	return value;
// });
};
this.setup = function (pin,dir){

		console.log("setting up for " + pin);

};
}
module.exports = new deviceDummy;