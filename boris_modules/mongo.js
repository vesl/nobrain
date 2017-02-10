//init

var status = false;

const err = require('./err.js');
const boris = require('./boris.js');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const db = mongoose.connect('mongodb://127.0.0.1/ILikeMusic',function(error){
	if(error) status = err.mongo(20,error);
	else if (mongoose.connection.readyState == 1) status = true;
	else status = err.mongo(20,err);
});

exports.getStatus = (callback) => {
	callback(status);
}

exports.find = (filter,callback,model) => {
	model.find(filter,function(error,res){
		if(error) {
			callback(err.mongo(23,error));
		}
		else callback(res);
	});
}

exports.add = (doc,callback) => {
	doc.save(function(error){
		if(error) {
			callback(err.mongo(21,error));
		} else {
			callback(doc);
		}
	});
}

exports.del = (id,model,callback) => {
	model.findOne({_id:id}).remove(function(error,res){
		if(error) {
			callback(err.mongo(22,error));
		} else {
			callback(res);
		}
	});
}


/////////////
// Schemas //
/////////////

//Sounds
var soundsSchema = new mongoose.Schema({
	name : {
		type: String,
		required: true,
		unique:true
	},
	playlist : {
		type: String,
		required: true,
	},
	url : {
		type: String,
		required: true,
		unique:true
	},
	file : {
		type: String,
		required: true,
	}
});
exports.sounds = db.model('sounds',soundsSchema);


//Playlists
var playlistsSchema = new mongoose.Schema({
	name : {
		type: String,
		required: true,
		unique:true, 
	},
	playlist : String
})
playlistsSchema.plugin(uniqueValidator);
exports.playlists = db.model('playlists',playlistsSchema);