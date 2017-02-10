const request = require('request').defaults({jar: true});
const err = require('./err.js');
const cheerio = require('cheerio');

exports.get = (url,callback) => {
	request(url, function(e, r, d) {
		if(e) err.html(20,e);
		else {
			if(r.statusCode != 200) callback(err.html(21,r.statusCode));
			else callback(d);
		}
	});
}

exports.post = (url, form, callback) => {
	request.post({url:url, form:form}, function(e, r, d) {
		if(e) callback(err.html(22,e));
		else {
			if(r.statusCode == 200 || r.statusCode == 302) callback(d);
			else callback(err.html(23,r.statusCode));
		}
	});
}

exports.find = (search, data) => {
	$ = cheerio.load(data);
	return $(search).html();
}

exports.findInputValue = (search, data) => {
	$ = cheerio.load(data);
	return $(search).val();
}

exports.parseNewTickets = (r) => {
	ret = [];
	$ = cheerio.load(r);
	issues = $('.issue');

	for(var i=0;i<issues.length;i++) {
		ret[i] = {
			id : issues.find('td[class=id]').find('a')[i].children[0].data,
			client : issues.find('td[class=project]').find('a')[i].children[0].data,
			subject : issues.find('td[class=subject]').find('a')[i].children[0].data
		};
	}
	return ret;
}