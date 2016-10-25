function deviceDummy()
{

this.write = function(pin,value,cb){
	console.log("dummy pin :" + value + "written at device " + pin);
	return cb(null,true);
// gpio.write(pin,value, function (err)
// 	{if (err) throw err;
// 		console.log( value + "written to " + pin);
// 	});

}; 
this.read = function(pin,cb){
var value = pin % 2;
	console.log("the dummy value given back is " + value + ' at device ' + pin);
	return  cb(null,value);
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