var Parser = require('./../lib/Parser'),
    should = require('should');


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