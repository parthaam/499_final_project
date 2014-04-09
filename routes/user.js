var http = require('http');
var FacebookClient = require('../backend/FacebookClient');

exports.list = function(req, res){
	// var client = new FacebookClient();
	var client = "";
	FacebookClient.getInfo("Derp", req, res);
};
