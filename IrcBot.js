var net = require('net');

/* Expose IrcBot */
module.exports = IrcBot;


function IrcBot(options) {
    var self = this;
    self.opt = options;
    self.conn = null;
    self.nameRegex = new RegExp(self.opt.nick);
}

IrcBot.prototype.onData = function(data) {
    console.log(data);
    //Get hostname 
    if(!this.opt.hostname) {
        this.opt.hostname = data.split(' ')[0].substr(1);
    }

    //Response of successful connection
    if(/001/.test(data)) {
        this.joinChannels();
    }

    //REPLY TO PINGS
    if(/PING/.test(data)) {
        this.sendMessage('PONG :' + this.opt.hostname);
    }

    //Our name has been said
    if(/PRIVMSG/.test(data) && this.nameRegex.test(data)) {

        //remove \r\n and split
        var splitData = data.trimRight(4).split(' '),
            messageArgs = this.generateMessageArgs(splitData, (splitData[2][0] !== '#'));

        this.parseMessage(messageArgs);
    }
};

IrcBot.prototype.generateMessageArgs = function(dataArr,isPrivate) {

    var speaker = dataArr[0].substr(1,dataArr[0].indexOf('!')-1),
        hostname = dataArr[0].slice(dataArr[0].indexOf('!')+2);

    var messageArgs = {
        isPrivate:isPrivate,
        rawstring:dataArr.join(' '),
        hostname:hostname,
        speakername:speaker
    };
    
    if(!isPrivate) {
        messageArgs.roomname = dataArr[2];
    }

    if((isPrivate && dataArr.length > 4) || (!isPrivate && dataArr.length > 5))
        messageArgs.args = (isPrivate) ? dataArr.slice(4).join(' '): dataArr.slice(5).join(' ');

    messageArgs.botcommand = (isPrivate) ? dataArr[3] : dataArr[4];
    if (isPrivate) messageArgs.botcommand = messageArgs.botcommand.slice(1);
    console.log(messageArgs);
    return messageArgs;
};

IrcBot.prototype.onConnect = function() {
    this.sendMessage('USER ' + this.opt.nick + ' hostname servername :'+this.opt.name);
    this.sendMessage('NICK ' + this.opt.nick);
};

/*
    Called when bot's name is mentioned in a PRIVMSG
    parse out commands and executes them.
*/
IrcBot.prototype.parseMessage = function(args) {
    var commands = this.opt.commands;
    //console.log('message: '+JSON.stringify(args));
    for(var i=0;i<commands.length;i++) {
        //see if message matches command
        if(commands[i].test(args.botcommand)) {
            var results = commands[i].action(args);
            for(var j=0;j<results.length;j++) {
                console.log('sending: '+results[j]);
                this.sendMessage(results[j]);
            }
            break;
        }
    }   
};

/*
    Called after connection is successful
    joins all channels passed as options
*/
IrcBot.prototype.joinChannels = function() {
    var channels = this.opt.channels,
        i;
    for(i=0; i<channels.length;i++) {
        this.sendMessage('JOIN '+channels[i]);
    }
};


IrcBot.prototype.sendMessage = function(message) {
    this.conn.write(message+'\r\n');
};

IrcBot.prototype.connect = function() {
    var self = this;

    self.conn = net.connect({
        host:self.opt.host,
        port:self.opt.port
    },function(data) {
        console.log('Connected.');
    });
    self.conn.setEncoding('utf-8');

    self.conn.on('data',self.onData.bind(self));
    self.conn.on('connect',self.onConnect.bind(self));
};
