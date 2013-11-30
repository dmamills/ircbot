#IrcBot

A small bot extendable ircbot built in coffescript and nodejs

###Usage
```javascript
   var IrcBot = require('./IrcBot');
   var options = { 
                 host:'hostname',
                 port:6667,
                 channels:['#some','#channels'], //array of channels to join
                 nick:'IrcBot', 
                 name:'Internet Relay Chat Robot',
                 commands:[Commands], //array of command objects
                 autojoin:true //optional will rejoin any channel kicked from
               }
      var bot = new IrcBot(options);
      bot.connect();

```

### Command object

The Command object is used to take action when a bot hears it's name in any channel it's in. It takes four parameters.

* ```name``` the command name
* ```description``` description of command and any arguments it takes
* ```regex``` a regex to match it to
* ```fn``` the function to execute when found

Example: 

```javascript

  function onHello(args) {
    var pvtMessage = Messages.pvtMsg(args.speakername, 'Hello ' + args.speakername + ' args: ' + args.args);
    var roomMessage = Messages.roomMsg(args.roomname,'Hello '+ args.speakername + '! args: ' + args.args );
    return (args.isPrivate) ? [pvtMessage] : [roomMessage];
  }
  
  var c = new Command('Hello','echos back hello and the speakers name',/HELLO/,onHello);
```

### Command arguments

Passed to the action function is an arguments object containing information about the message sent.

* ```rawstring``` the entire string recieved by the bot.
* ```isPrivate``` true if a private message, false if a channel message.
* ```hostname``` the senders entire hostname.
* ```speakername``` the name of the sender.
* ```roomname``` the name of channel.
* ```botcommand``` the command sent by speakername.
* ```args``` any additional arguments to the command.

### Help Command

The HELP and DESC commands are reserved. 

* ```HELP``` will return a list of all commands the bot provides.
* ```DESC <command name>``` will return a command's description. 


### Message Helper

Creates strings for various irc commands. Useful for command objects

```javascript
   var Messages = require('IrcBot').Messages;
   Messages.join(channel);
   Messages.pong(servername);
   Messages.user(nick,host,server,realname);
   Messages.nick(nick);
   Messages.pvtMsg(nick,message);
   Messages.roomMsg(channel,message);
   Messages.quit(reason);
   Messages.mode(channel,mode,nick);
   Messages.name(channel);
   Messages.topic(channel,topic);
   Messages.part(channel);
   Messages.oper(name,password)
   Messages.squit(server,reason)
   Messages.list(channel)
   Messages.invite(nick,channel)
   Messages.kick(nick,channel)
   Message.notice(target,text)
   Messages.who(mask)
   Messages.whois(target)
   Messages.whowas(target)
   Messages.kill(nick,comment)
   Messages.away(text)
```

### Todo

* SSL
* Connection state
* Nick Serv auth

#### Pull requests accepted!

### License
Licensed under the MIT license.
Copyright 2013 Daniel Mills &lt;mills.dma@gmail.com&gt;