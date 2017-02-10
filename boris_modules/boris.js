const fs = require('fs');
const err = require('./err.js');

exports.readFileSync = (path) => {
	var data;
	try {
		data = fs.readFileSync(path);
	} catch (e) {
		console.log(e);
		data = err.fs(20,e);
	}
	return data;
}

exports.removeSpecialChars = (str) => {
	return str.replace(/[^A-Z0-9]/ig, "_").toUpperCase();
}

exports.empty = (obj) => {
	return (obj.length <= 0 || obj === false || obj === null || obj === 'undefined') ? true : false;
}

exports.checkNewClient = (socket) => {
	const exec = require('./exec.js');
	const mongo = require('./mongo.js');
	//check du serveur cherrypy
	exec.ajax({check:"this"},function(res){
		socket.emit("check_cherrypy",res);
	});
	//check de mongoose
	mongo.getStatus(function(res){
		socket.emit("check_mongoose",res);
	});
}