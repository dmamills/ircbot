var IrcBot = require('./../index').Bot,
    Command = require('./../index').Command,
    Messages = require('./../index').Messages;

function onHello(args) {
    
    var pvtMessage = Messages.pvtMsg(args.speakername, 'Hello ' + args.speakername + ' args: ' + args.args);
    var roomMessage = Messages.roomMsg(args.roomname,'Hello '+ args.speakername + '! args: ' + args.args );
    return (args.isPrivate) ? [pvtMessage] : [roomMessage];
}

function onQuit(args) {
    return [ Messages.part(args.roomname) ];
}

function goCrazy(args) {
    var a = [],m = args.args.split(' ')[0], s = '';
    for(var i=0; i < m;i++) {
         if(i < (m/2))
            s += '!';
         else
            s = s.slice(1);

        a.push(Messages.roomMsg(args.roomname,s));
    }
    return a;
}

var commands = [
    new Command('Hello','echos hello back', /HELLO/ ,onHello),
    new Command('Quit','leaves a channel', /QUIT/,onQuit),
    new Command('Crazy','goes crazy',/CRAZY/,goCrazy)
];

var options = { 
    host:'localhost',
    port:6667,
    nick:'testbot',
    channels: ['#room1','#room2','#room3'],
    autojoin:true,
    unknownCommand:'I dont understand.',
    commands:commands
};

var ircbot = new IrcBot(options);
ircbot.connect();