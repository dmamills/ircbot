var IrcBot = require('./../index').Bot,
    Command = require('./../index').Command,
    Messages = require('./../index').Messages;

function onHello(args) {
    
    var pvtMessage = Messages.pvtMsg(args.speakername, 'Hello ' + args.speakername + ' args: ' + args.args);
    var roomMessage = Messages.roomMsg(args.roomname,'Hello '+ args.speakername + '! args: ' + args.args );
    return (args.isPrivate) ? [pvtMessage] : [roomMessage];
}

function onQuit(args) {
    return [Messages.part(args.roomname)];
}

var commands = [
    new Command('Hello','echos hello back', /HELLO/ ,onHello),
    new Command('Quit','leaves a channel', /QUIT/,onQuit)
];

var options = { 
    host:'localhost',
    port:6667,
    nick:'testbot',
    channels: ['#room1','#room2','#room3'],
    autojoin:true,
    commands:commands
};

var ircbot = new IrcBot(options);
ircbot.connect();