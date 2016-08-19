var gpio = require('rpi-gpio');

function device()
{
this.setup = function (pin,dir){
var direction = (dir=='in')?gpio.DIR_IN:gpio.DIR_OUT;
gpio.setup(pin,direction);
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
//return gpio.read(pin);
gpio.read(pin,function(err,value){
	if (err) {
	console.log(err);
		//throw err;

		}
	console.log(value + " read from pin "+ pin);
	return value;
});
};
this.clean = function (){
gpio.destroy(function(){console.log("closed now..");});
};
}
module.exports = new device;
