var IrcBot = require('./../index').Bot,
    should = require('should');

describe('IrcBot',function() {
    var options = {
             host:'hostname',
             port:6667,
             channels:['#test'],
             nick:'unittester',
             name:'Unit Test Bot',
             commands:[]
           };
    var ircbot = new IrcBot(options);
    it('should store hostname if it is undefined',function() {
           ircbot.onData(':test.ircserver.net NOTICE * :*** Looking up your hostname...');
           ircbot.opt.hostname.should.equal('test.ircserver.net');
    });

    it('should parse out own name from private messages',function() {
        ircbot.nameRegex.test(':someshmuck!~someschmuck@127.0.0.1.the.internet.com PRIVMSG unittester :TEST').should.equal.true;
    });

    it('should parse out own name from room message',function() {
        ircbot.nameRegex.test(':someshmuck!~someschmuck@127.0.0.1.the.internet.com PRIVMSG #someroom :!unittester :TEST').should.equal.true;
    });
});


