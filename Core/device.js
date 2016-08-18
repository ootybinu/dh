var gpio = require('rpi-gpio');

function device()
{
this.setup = function (pin){

gpio.setup(pin,gpio.DIR_OUT,this.write(pin,1));
};

this.write = function(pin,value){
/*try {

	gpio.setup(pin,gpio.DIR_OUT , function(){});
}catch(e){console.log('error @ setup');}
*/
gpio.write(pin,value, function (err)
	{if (err) throw err;
		console.log( value + "written to " + pin);
	});

}; 
this.read = function(pin){
gpio.read(pin,function(err,value){
	if (err) throw err;
	console.write(value + " read from pin "+ pin);
	return value;
});
};

}
module.exports = new device;