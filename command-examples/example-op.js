var IrcBot = require('./../index').Bot,
    Command = require('./../index').Command,
    Messages = require('./../index').Messages;

function ops(names) {

    return function(args) {
        if(names.indexOf(args.speakername) === -1) {
            return [ Messages.roomMsg(args.roomname,'I aint gonna op you'),
                     Messages.roomMsg(args.roomname,'Too bad' + args.speakername)];
        } else {
            return [ Messages.roomMsg(args.roomname,'OK! Giving op to:' +args.speakername),
                     Messages.mode(args.roomname,'+o',args.speakername) ];
        }
    };
}

var opList = ops(['dmamills']);

var commands = [
        new Command('OPER','gives operand to select speakers', /OPER/ ,opList)
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