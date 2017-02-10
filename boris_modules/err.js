const config = require('./config.js').err;
const fs = require('fs');

const ret = (id,ref,detail,module) => {
	fs.writeFile(
		config.logfile,
		"| Module : "+module+" | Id : "+id+" | Message : "+ref+" | Detail : "+detail,
		function(err){
			if(err) console.log(err);
		});
	const err = {
		error : module,
		n : id,
		message : ref,
		detail : detail
	};
	return err;
}

exports.fs = (id,detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Le fichier n'existe pas"
	}
	return ret(id,refs[id],detail,"FS");
}

exports.cherrypy = (id,detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Connection au serveur cherrypy impossible",
		21 : "Connection au serveur cherrypy timeout",
		22 : "Pas de data à envoyer dans la requete cherrypy"
	};
	return ret(id,refs[id],detail,"CHERRYPY");
}


exports.mongo = (id,detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Connection au serveur mongodb impossible",
		21 : "Impossible d'ajouter l'item a mongodb",
		22 : "Impossible de supprimer l'item",
		23 : "Impossible de trouver l'objet"
	};
	return ret(id,refs[id],detail,"MONGO");
}

exports.playlists = (id,detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Aucune methode appellee"
	};
	return ret(id,refs[id],detail,"PLAYLISTS");
}

exports.sounds = (id,detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Aucune methode appellee",
		21 : "L'url n'est pas un lien youtube"
	};
	return ret(id,refs[id],detail,"SOUNDS");
}

exports.html = (id, detail) => {
	detail = detail || 0;
	var refs = {
		20 : "La requete get a echouee",
		21 : "Le code de retour de la requete get n'est pas 200",
		22 : "La requete post a echouee",
		23 : "Le code de retour de la requete post n'est pas 200"
	};
	return ret(id,refs[id],detail,"HTML-CLIENT");
}

exports.redmine = (id, detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Impossible de se connecter (login / password certainement)"
	};
	return ret(id,refs[id],detail,"HTML-CLIENT");
}

exports.imap = (id,detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Impossible d'ouvrir la boite mail indiquee",
		21 : "Impossible d'executer le filtre de recherche",
		22 : "Erreur avec la connexion imap",
		23 : "Erreur avec un mail"
	};
}

exports.slack = (id,detail) => {
	detail = detail || 0;
	var refs = {
		20 : "Mauvais token slack"
	};
}
