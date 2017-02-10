const Imap = require('imap');
const inspect = require('util').inspect;
const config = require('./config.js');
const err = require('./err.js');


exports.checkNewMails = (callback) => {
	count = 0;
	var imap = new Imap({
		user: config.ldap.login,
		password: config.ldap.password,
		host: config.imap.server,
		port: config.imap.port,
		tls: true
	});
	 
	imap.once('ready', function() {
		imap.openBox(config.imap.mailbox, true, function(e, box) {
			if (e) callback(err.imap(20,e));
			else {
				imap.search([ 'UNSEEN' ], function(e, r) {
					if (e) callback(err.imap(21,e));
				   	else {
					    callback({
					    		unreadMails : r.length
					    });
					    imap.end();
					}
				});
			}
		});
	}); 
	 
	imap.once('error', function(error) {
		callback(err.imap(22,error));
	});

	imap.connect();
}