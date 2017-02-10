const slack = require('slack');
const config = require('./config.js');
const err = require('./err.js');

exports.hook = (data,callback) => {
	console.log(data);
	channel = false;
	if(data.token == config.slack.token || data.token == config.slack.token_unibail) {
		if(data.bot_name) {
			callback({
				module : data.channel_name,
				user : data.bot_name,
				message : data.text
			});
		}
	}
	else err.slack(20,data.token);
}
