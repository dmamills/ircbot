var net = require('net');

/* Expose IrcBot */
module.exports = IrcBot;

/*
	options:
		host
		port
		nick
		name
		channel list
		commands?
*/
function IrcBot(options) {
	var self = this;
	self.opt = options;
	self.conn = null;
}

IrcBot.prototype.onData = function(data) {
	console.log(data);

	//Response of successful connection
	if(/001/.test(data)) {
		this.joinChannels();
	};

	//REPLY TO PINGS
	if(/PING/.test(data)) {
		this.sendMessage('PONG ' + data.substr(5));
	}

	//SOMEONE CALLING MAH NAME
	if(/PRIVMSG #testmillsroom :!testbot123/.test(data)){
		var cut = data.indexOf('PRIVMSG')+36;
		this.parseMessage(data.substr(cut));
	}
};

IrcBot.prototype.onConnect = function(data) {
	//console.log('connect event');
	this.sendMessage('USER ' + this.opt.nick + ' testbot testbot :testbot123');
	this.sendMessage('NICK ' + this.opt.nick);
};

/*
	Called when bot's name is mentioned in a PRIVMSG
	parse out commands and executes them.
*/
IrcBot.prototype.parseMessage = function(message) {

	console.log('message: '+message);

	if(/HELLO/.test(message)) {
		console.log('sending hello...');
		this.sendMessage('PRIVMSG #testmillsroom :hello');
	} else {
		this.sendMessage('PRIVMSG #testmillsroom :I have no clue what you are asking me.');
	}
};

/*
	Called after connection is successful
	joins all channels passed as options
*/
IrcBot.prototype.joinChannels = function() {
	var channels = this.opt.channels,
		i;
	for(i=0; i<channels.length;i++) {
		this.sendMessage('JOIN '+channels[i]);
	}

};

IrcBot.prototype.sendMessage = function(message) {
	this.conn.write(message+'\r\n');
};

IrcBot.prototype.connect = function() {
	var self = this;

	self.conn = net.connect({
		host:self.opt.host,
		port:self.opt.port
	},function() {
		console.log('Connected.');
	});
	self.conn.setEncoding('utf-8');

	self.conn.on('data',self.onData.bind(self));
	self.conn.on('connect',self.onConnect.bind(self));
};
