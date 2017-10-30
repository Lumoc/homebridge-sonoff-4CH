var request = require('request');
var Service, Characteristic;

module.exports = function(homebridge){
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	
	homebridge.registerAccessory('homebridge-sonoff4ch', 'Sonoff4ch', Sonoff4ch);
}

function Sonoff4ch(log, config){
	this.log = log;
	this.name = config.name || 'Sonoff Device';
	this.ip = config.ip;

	if(!this.ip)
		throw new Error('Your must provide IP address of the switch.');

	this.service = new Service.Lightbulb(this.name);
	this.serviceInfo = new Service.AccessoryInformation();

	this.serviceInfo.setCharacteristic(Characteristic.Manufacturer, 'Sonoff4CH');
	this.serviceInfo.setCharacteristic(Characteristic.Model, 'Basic Lights switch');
	this.serviceInfo.setCharacteristic(Characteristic.SerialNumber, '123-45-678');

	this.service.getCharacteristic(Characteristic.On);
	this.service.on('get', this.getPowerState.bind(this));
	this.service.on('set', this.setPowerState.bind(this));
}
