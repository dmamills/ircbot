var IrcBot = require('./IrcBot');

var options = { 
	host:'irc.freenode.net',
	port:6667,
	nick:'testbot123',
	channels: ['#testmillsroom']
};

var ircbot = new IrcBot(options);
ircbot.connect();
