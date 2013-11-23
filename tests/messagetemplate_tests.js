var Messages = require('./../index').Messages,
    should = require('should');

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
    });
});