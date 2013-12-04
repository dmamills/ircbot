var Commander = require('./../lib/Commander'),
    Command = require('./../index').Command,
    should = require('should');

var commandA = new Command('A','Test Command A',/A/,function(args){
    return ['command A results'];
});

var commandB = new Command('B','Test Command B',/B/,function(args){
    return ['command B results'];
});

var helpCommand = new Command('Help','Help',/HELP/,function(args){
    return ['Help command'];
});

var descCommand = new Command('Desc','Desc',/DESC/,function(args){
    return ['Desc command'];
});

describe('Commander',function(){
    var commander = new Commander([commandA,commandB]);

    it('should find execute command',function(){
        commander.checkCommands({botcommand:'A'}).should.eql(['command A results']);
    });

    it('should return info about command',function(){
        commander.helpCommand('A').should.equal('Test Command A');
    });

    it('should return list of commands',function(){
        commander.help().should.equal('Commands: A, B --- Send DESC <command name> for more info');
    });

    it('should throw an exception when a command is passed with HELP',function(){
        (function(){
            var c = new Commander([helpCommand]);
        }).should.throw('HELP is a reserved regexp');
    });

     it('should throw an exception when a command is passed with DESC',function(){
        (function(){
            var c = new Commander([descCommand]);
        }).should.throw('DESC is a reserved regexp');
    });
});