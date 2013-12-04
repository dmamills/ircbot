var IrcBot = require('./../index').Bot,
    Command = require('./../index').Command,
    Messages = require('./../index').Messages;

function onHello(args) {
    
    var pvtMessage = Messages.pvtMsg(args.speakername, 'Hello ' + args.speakername + ' args: ' + args.args);
    var roomMessage = Messages.roomMsg(args.roomname,'Hello '+ args.speakername + '! args: ' + args.args );
    return (args.isPrivate) ? [pvtMessage] : [roomMessage];
}

var helloCommand = new Command('Hello','echos hello back', /HELLO/ ,onHello)

var options = { 
    host:'localhost',
    port:6667,
    nick:'testbot',
    channels: ['#room1','#room2','#room3'],
    autojoin:true,
    autoconnect:true,
    unknownCommand:'I dont understand.',
    commands:[helloCommand]
};

var ircbot = new IrcBot(options);