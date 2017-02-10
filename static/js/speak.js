var taggle = false;
var forge = false;
var mails = false;

const speak = (text) => {

	if(taggle) return 0;
	else taggle = true;

	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[1];
	msg.voiceURI = 'native';
	msg.volume = 1;
	msg.rate = 1;
	msg.pitch = 1;
	msg.text = text;
	msg.lang = 'fr-FR';
	speechSynthesis.speak(msg);
	msg.onend = function(event) {
    	taggle = false;
	};
}

const speakSlack = (data) => {
	text = "Alerte Slack. Client "+data.user;
	speak(text);
}

const speakMails = (data) => {
	taggle = false;
	text = "Il y a "+data.unreadMails+". mayle non lus dans la boite support.";
	speak(text);
}

const speakTickets = (data) => {
	$.each(data,function(){
		taggle = false;
		this.client = (this.client == 'Clients ') ? 'non daifini' : this.client;
		text = "Nouveau ticket dans la Forge. Client "+this.client;
		speak(text);
	});
}

//wakeup alsa
jcena = new Audio('https://slav.rocks/files/cena.mp3');
jcena.volume=.0;
jcena.loop = true;
jcena.play();
sdog = new Audio('https://slav.rocks/files/sd.mp3');
sdog.volume=.0;
sdog.loop = true;
sdog.play();
