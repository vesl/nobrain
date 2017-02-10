//Modules npm
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyparser = require('body-parser');
//Modules custom
const boris = require('./boris_modules/boris.js');
const config = require('./boris_modules/config.js').app;
const slack = require('./boris_modules/slack.js');
const redmine = require('./boris_modules/redmine.js');
const imap = require('./boris_modules/imap.js');

server.listen(config.port, config.address);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended:true
}));
app.use(session({
	resave: true,
	saveUninitialized: false,
	secret: config.sessionSalt
}))

///////////
//routing//
///////////

//GET
app.get('/',function(req,res){
	res.setHeader('Content-Type', 'text/html');
	res.status(200).send(boris.readFileSync(config.homepage));
});
app.get(/^\/js\/.*.js$/,function(req,res){
	res.send(boris.readFileSync('./static'+req.url));
});
app.get(/^\/files\/.*$/,function(req,res){
        res.send(boris.readFileSync('./static'+req.url));
});
app.get(/^\/css\/.*.css$/,function(req,res){
	res.setHeader('Content-Type', 'text/css');
	res.status(200).send(boris.readFileSync('./static'+req.url));
});
app.get(/^\/fonts\/.*.(eot|svg|ttf|woff|woff2)$/,function(req,res){
	res.send(boris.readFileSync("./static"+req.url));
});
//POST
app.post('/nobrain/slack',function(req,res){
	console.log('Slack post');
	slack.hook(req.body,function(r){
		console.log(r);
		io.emit('speakSlack',r);
	});
});

//setInterval(function(){
//	imap.checkNewMails(function(mails){
//		if(mails) {
//			console.log(mails);
//			if(mails.unreadMails > 0) io.emit('speakMails',mails);
//		}
//	});
//},60000);

setInterval(function(){
	redmine.checkNewTickets(function(tickets){
		console.log(tickets);
		if(tickets.length > 0) io.emit('speakTickets',tickets);
	});
},180000);

//slack.listen();
