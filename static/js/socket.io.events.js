var socket = io();
socket.on('speakSlack',function(data){
	speakSlack(data);
});
socket.on('speakTickets',function(data){
	speakTickets(data);
});
socket.on('speakMails',function(data){
	speakMails(data);
});