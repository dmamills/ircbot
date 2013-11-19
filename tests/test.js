var IrcBot = require('./../index').Bot,
    Command = require('./../index').Command,
    Messages = require('./../index').Messages,
    Parser = require('./../lib/Parser'),
    should = require('should');

describe('IrcBot',function(){
    
    describe('onData',function() {
        var options = {
                 host:'hostname',
                 port:6667,
                 channels:['#test'],
                 nick:'unittester',
                 name:'Unit Test Bot',
                 commands:[]
               };
        var ircbot = new IrcBot(options);
        it('should store hostname if it is undefined',function(){

            
               ircbot.onData(':test.ircserver.net NOTICE * :*** Looking up your hostname...');
               ircbot.opt.hostname.should.equal('test.ircserver.net');
        });

        it('should parse out own name from private messages',function(){
            ircbot.nameRegex.test(':someshmuck!~someschmuck@127.0.0.1.the.internet.com PRIVMSG unittester :TEST').should.equal.true;
        });
    });
});


describe('Parser',function() {
    describe('GenerateMessageArgs',function() {
        it('should parse private message',function() {
            
            var data = ':unittester!~unittester@666.666.666.666.the.ipofthebeast.com PRIVMSG testbot123 :COMMAND arg1 arg2';
            var results = Parser.prototype.parse(data,true);

            results.isPrivate.should.be.true;
            results.speakername.should.equal('unittester');
            results.args.should.equal('arg1 arg2');
            results.botcommand.should.equal('COMMAND');
            results.rawstring.should.equal(data);
            results.hostname.should.equal('unittester@666.666.666.666.the.ipofthebeast.com');
        });

        it('should parse room message',function() {
            
            var data = ':unittester!~unittester@666.666.666.666.the.ipofthebeast.com PRIVMSG #unittesting :!unittester COMMAND arg1 arg2';
            var results = Parser.prototype.parse(data,true);

            results.isPrivate.should.be.false;
            results.speakername.should.equal('unittester');
            results.args.should.equal('arg1 arg2');
            results.botcommand.should.equal('COMMAND');
            results.rawstring.should.equal(data);
            results.hostname.should.equal('unittester@666.666.666.666.the.ipofthebeast.com');
        });
    });
});

describe('Command',function() {
    it('should expose properties',function(){
        var command = new Command('Test','A unit test command',/TEST/,function(args) {
            return [];
        });

        command.name.should.equal('Test');
        command.description.should.equal('A unit test command');
        command.regex.test('TEST').should.be.true;
        command.action().length.should.equal(0);
    });
});

describe('Message Templates',function(){

    it('ping',function(){
        Messages.pong('some.servername.net').should.equal('PONG :some.servername.net');
    });

    it('join',function(){
        Messages.join('##javascript').should.equal('JOIN ##javascript');
    });

    it('user',function(){
        Messages.user('unittester','unittester','my-server.com','Unit Tester').should.equal('USER unittester unittester my-server.com Unit Tester');
    });

    it('nick',function(){
        Messages.nick('unittester').should.equal('NICK unittester');
    });

    it('pvtMsg',function(){
        Messages.pvtMsg('unittester','Hey im unit testing you').should.equal('PRIVMSG unittester :Hey im unit testing you');
    });

    it('roomMsg',function(){
        Messages.roomMsg('##javascript','Hey im unit testing').should.equal('PRIVMSG ##javascript :Hey im unit testing');
    });

    it('quit',function(){
        Messages.quit('just because').should.equal('QUIT :just because');
    });

    it('mode',function(){
        Messages.mode('##javascript','+o','unittester').should.equal('MODE ##javascript +o unittester');
    })
});