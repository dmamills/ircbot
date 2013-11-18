#IrcBot

A small bot extendable ircbot built in nodejs

###Usage
```javascript
   var IrcBot = require('./IrcBot');
   var options = { 
                 host:'hostname',
                 port:6667,
                 channels:['#some','#channels'],
                 nick:'IrcBot',
                 name:'Internet Relay Chat Robot',
                 commands:[Commands]
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
   var c = new Command('Hello','echos back hello and the speakers name',/HELLO/,function(args) {
      return (isPrivate) ? ['PRIVMSG ' + args.speakername + ':Dont PM me!'] :['PRIVMSG '+args.roomname + ' :Hello '+ args.speakername + '!'];
   });
```

### Command arguments

Passed to the action function is an arguments object containing information about the message sent.

* ```rawstring``` the entire string recieved by the bot.
* ```isPrivate``` true if a private message, false if a channel message.
* ```hostname``` the senders entire hostname.
* ```speakername``` the name of the sender.
* ```botCommand``` the command sent by speakername.
* ```args``` any additional arguments to the command.