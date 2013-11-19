var IrcBot = require('./../IrcBot'),
    Command = require('./../command'),
    should = require('should');

describe('IrcBot',function(){
    describe('Parse Message',function() {
        it('should parse private message',function() {
            var data = ':unittester!~unittester@666.666.666.666.the.ipofthebeast.com PRIVMSG testbot123 :COMMAND arg1 arg2',
                dataArr = data.trimRight(4).split(' '),
                generateMessageArgs = IrcBot.prototype.generateMessageArgs;

            var results = generateMessageArgs(dataArr,true);

            results.isPrivate.should.be.true;
            results.speakername.should.equal('unittester');
            results.args.should.equal('arg1 arg2');
            results.botcommand.should.equal('COMMAND');
            results.rawstring.should.equal(data);
            results.hostname.should.equal('unittester@666.666.666.666.the.ipofthebeast.com');
        });
    });

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