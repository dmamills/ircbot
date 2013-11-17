var IrcBot = require('./IrcBot'),
	Command = require('./command');


/*
  commands format

   commands:  [
	{regex:/something/},
	 action:function(){ returns an array of things to send }
   ]
*/

var commands = [
	new Command(/HELLO/,function(m){return ['PRIVMSG #testmillsroom :hello!'];}),
];

/*
var commands = [
	{ regex:/HELLO/,
	  action:function(m) {
	  	return ['PRIVMSG #testmillsroom :hello!'];
	  } 
	}
];*/


var options = { 
	host:'irc.freenode.net',
	port:6667,
	nick:'testbot123',
	channels: ['#testmillsroom'],
	commands:commands
};

var ircbot = new IrcBot(options);
ircbot.connect();


