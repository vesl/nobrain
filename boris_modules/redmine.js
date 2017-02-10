const config = require('./config.js');
const html = require('./html.js');
const err = require('./err.js');

const login = (callback) => {
	html.get(config.redmine.urlNewTickets,function(r){
		form = {
			authenticity_token : html.findInputValue('input[name=authenticity_token]',r),
			back_url : config.redmine.urlNewTickets,
			username : config.ldap.login,
			password : config.ldap.password
		};
		html.post(config.redmine.urlLogin, form, function(r) {
				console.log(r);
				if(r == '<html><body>You are being <a href="https://forge.openevents.fr/issues?query_id=91">redirected</a>.</body></html>') {
					callback({login:true});
				} 
				else callback(err.redmine(20,r));
		});
	});
}

const isLogin = (callback) => {
	html.get(config.redmine.urlNewTickets,function(r){
		const form = html.find('#login-form',r);
		if(form != null) login(function(r){callback(r);});
		else callback({login:true});
	});
}

const parseNewTickets = (callback) => {
	html.get(config.redmine.urlNewTickets,function(r){
		const issues = html.parseNewTickets(r);
		callback(issues);
	});
}

exports.checkNewTickets = (callback) => {
	isLogin(function(r){
		if(r.login != true) {
			login(function(r){
				if(r.login && r.login == true) {
					parseNewTickets(function(r){
						callback(r);
					});
				} 
				else callback(r);
			});
		}
		else {
			parseNewTickets(function(r){
				callback(r);
			});
		}
	});
}
