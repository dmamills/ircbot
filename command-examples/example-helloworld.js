var IrcBot = require('./../index').Bot,
    Command = require('./../index').Command,
    Messages = require('./../index').Messages;

function onHello(args) {
    
    var pvtMessage = Messages.pvtMsg(args.speakername, 'Hello ' + args.speakername + ' args: ' + args.args);
    var roomMessage = Messages.roomMsg(args.roomname,'Hello '+ args.speakername + '! args: ' + args.args );
    return (args.isPrivate) ? [pvtMessage] : [roomMessage];
}

var commands = [
    new Command('Hello','echos hello back', /HELLO/ ,onHello)
];

var options = { 
    host:'irc.freenode.net',
    port:6667,
    nick:'testbot123',
    channels: ['#testmillsroom','#testmillsroom2'],
    commands:commands
};

var ircbot = new IrcBot(options);
ircbot.connect();