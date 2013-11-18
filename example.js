var IrcBot = require('./IrcBot'),
    Command = require('./command');


function onHello(args) {
    return (args.isPrivate) ? ['PRIVMSG ' + args.speakername + ' :Dont PM me!'] :
                              ['PRIVMSG '+args.roomname + ' :Hello '+ args.speakername + '!'];
}

var commands = [
    new Command('Hello','echos hello back', /HELLO/ ,onHello)
];

var options = { 
    host:'irc.freenode.net',
    port:6667,
    nick:'testbot123',
    channels: ['#testmillsroom'],
    commands:commands
};

var ircbot = new IrcBot(options);
ircbot.connect();