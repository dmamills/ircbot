var Command = require('./../index').Command,
    should = require('should');

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