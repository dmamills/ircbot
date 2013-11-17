var net = require('net');//,
	//Command = require('./command');

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
	self.nameRegex = new RegExp(':!'+self.opt.nick);
}

IrcBot.prototype.onData = function(data) {
	console.log(data);

	//Response of successful connection
	if(/001/.test(data)) {
		this.joinChannels();
	}

	//REPLY TO PINGS
	if(/PING/.test(data)) {
		this.sendMessage('PONG ' + data.substr(5));
	}

	//SOMEONE CALLING MAH NAME
	if(/PRIVMSG/.test(data) && this.nameRegex.test(data)) {
		var cut = data.indexOf('PRIVMSG')+36;
		this.parseMessage(data.substr(cut));
	}
};

IrcBot.prototype.onConnect = function(data) {
	this.sendMessage('USER ' + this.opt.nick + ' testbot testbot :testbot123');
	this.sendMessage('NICK ' + this.opt.nick);
};

/*
	Called when bot's name is mentioned in a PRIVMSG
	parse out commands and executes them.
*/
IrcBot.prototype.parseMessage = function(message) {

	console.log('message: '+message);
	var commands = this.opt.commands;

	for(var i=0;i<commands.length;i++) {
		if(commands[i].test(message)) {
			var results = commands[i].action(message);
			for(var j=0;j<results.length;j++) {
				this.sendMessage(results[j]);
			}
			break;
		}
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
