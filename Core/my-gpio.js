var fs           = require('fs');
var debug        = require('debug')('my-gpio');
var PATH = '/sys/class/gpio';
var PINS = {
	// 1: 3.3v
        // 2: 5v
        '3':  2,
        // 4: 5v
        '5':  3,
        // 6: ground
        '7':  4,
        '8':  14,
        // 9: ground
        '10': 15,
        '11': 17,
        '12': 18,
        '13': 27,
        // 14: ground
        '15': 22,
        '16': 23,
        // 17: 3.3v
        '18': 24,
        '19': 10,
        // 20: ground
        '21': 9,
        '22': 25,
        '23': 11,
        '24': 8,
        // 25: ground
        '26': 7,

        // Model B+ pins
        // 27: ID_SD
        // 28: ID_SC
        '29': 5,
        // 30: ground
        '31': 6,
        '32': 12,
        '33': 13,
        // 34: ground
        '35': 19,
        '36': 16,
        '37': 26,
        '38': 20,
        // 39: ground
        '40': 21
	}; //Pins

function device(){

this.read = function(pin, cb)
{
debug('starting read from %d',pin);
	if (typeof cb !== 'function'){
		//throw new Error('Callback should be provided for reading');
		return cb("Missing callback function", null);
	}
	var iPin = PINS[pin];

	// isPinReady(iPin,function (err,value)
	// {
	// 	if (value)
	// 	{

	// 		async.waterfall([pinReady(iPin),])
	// 	}else
	// 	{

	// 	}
	// });
	debug('pin is %d',iPin);
	isPinReady(iPin, function(err,value){
		if (!value){
			pinReady(iPin, function (err,data) {
				if (err)
					{	
						debug('Exception occured while exporting' + err);
						return cb(err);
					}
					setDirection(iPin,"IN",function(err,data){

						readPin(iPin,function(err,data){
								if (err)
									return cb(err);
								debug("Read value %d from %d", data, iPin);
								return cb(null,data);
							});	

					});
				
			});		
		}else
		{
			setDirection(iPin,"IN",function(err,data){
				readPin(iPin,function(err,data){
						if (err)
							return cb(err);
						debug("Read value %d from %d", data, iPin);
						return cb(null,data);
					});	
			});
		}

	});

}

this.write = function(pin,outValue,cb)
{
	var iPin = PINS[pin];
		isPinReady(iPin, function(err,value){
		if (!value){
			pinReady(iPin, function (err,data) {
				if (err)
					{	
						debug('Exception occured while exporting' + err);
						return cb(err);
					}
					setDirection(iPin,"OUT",function(err,data){

						writePin(iPin,outValue, function(err){
								if (err)
									return cb(err);
								debug("Write value %d from %d", outValue, iPin);
								return cb(null,data);
							});	

					});
				
			});		
		}else
		{
			setDirection(iPin,"OUT",function(err,data){
				if (err)
				{ debug('error occured while setting direction' + err);
					cb(err);

					}
				writePin(iPin,outValue,function(err,data){
						if (err)
							return cb(err);
						debug("Write value %d from %d", data, iPin);
						return cb(null,data);
					});	
			});
		}

	});
}

function isPinReady(iPin, cb)
{
debug('checking is pinready');
	fs.exists(PATH+'/gpio'+iPin, function (exists){
		return cb(null, exists);
	});
}//isPinReady

function pinReady(iPin, cb)
{
	debug('Exporting %d', iPin);
	fs.writeFile(PATH + '/export', iPin, function(data){
	if (cb) 
		return cb(null, data);
	});
} //pinReady

function destroyPin(iPin, cb)
{
	debug('Destroying %d', iPin);
	fs.writeFile(PATH + '/unexport', iPin, function(data){
	if (cb) 
		return cb(null, data);
	});
}//destroyPin

function setDirection(iPin,direction,cb)
{
	debug('setting direction %s for %d',direction, iPin);
	fs.writeFile(PATH + '/gpio'+ iPin + '/direction', direction,function(err){
	return cb(null, err);
	});
} //set direction 

function readPin(iPin, cb)
{
	debug('reading pin %d', iPin);
	fs.readFile(PATH+'/gpio' + iPin+'/value','utf-8', function(err,data){
	if (err)
		return cb(err);
	return cb(null,data);
	});

}//read pin

function writePin(iPin,value,cb)
{
debug('writing %d to %d',value, iPin);
fs.writeFile(PATH+'/gpio'+iPin+'/value',value,function(err,data){
		if (err)
		return cb(err);
	return cb(null,data);
});
}//writePin
}//

module.exports = new device;