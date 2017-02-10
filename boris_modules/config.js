exports.err = {
	logfile : '/var/log/nodejs/nobrain.log'
}

exports.app = {
	port : 8080,
	address : '0.0.0.0',
	homepage : 'index.html',
	sessionSalt : 'changeme'
}

exports.ldap = {
	login : 'changeme',
	password : 'changeme'
}

exports.imap = {
	mailbox : 'changeme',
	server : 'changeme',
	port : 993
}

exports.slack = {
	token : 'changeme',
	token_unibail : 'changeme',
}

exports.redmine = {
	urlNewTickets : 'changeme',
	urlLogin : 'changeme',
}

exports.speak = {
	googleApiKey : 'changeme'
}
