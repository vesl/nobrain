const exec = require('./exec.js');

var session = {};
session.sounds = {};
session.sounds = {
	pid:false,
	duration:false,
	seconds:0,
	volume:0,
	playing:false,
};
session.playlists = {};
session.playlists.current = {};
session.playlists.current.playAll=false;
session.playlists.currentSounds = [];

exec.ajax({action:'sounds',getVol:1},function(vol){
	session.sounds.volume = parseInt(vol.out[0].replace('\n',''));
});

exports.get = () => {
	return session;
}

exports.update = (update) => {
	session = update;
}
	
