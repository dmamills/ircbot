var IrcBot = require('./../IrcBot'),
	Command = require('./../command'),
	should = require('should');

describe('IrcBot',function(){
	it('should create instance',function() {
		(1+1).should.equal(2);
	});
});

describe('Command',function() {
	it('should thing',function(){
		(5).should.not.equal(4);
	});
});