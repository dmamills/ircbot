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
      return (isPrivate) ? ['PRIVMSG ' + args.speakername + ' :Dont PM me!'] :['PRIVMSG '+args.roomname + ' :Hello '+ args.speakername + '!'];
   });
```

### Command arguments

Passed to the action function is an arguments object containing information about the message sent.

* ```rawstring``` the entire string recieved by the bot.
* ```isPrivate``` true if a private message, false if a channel message.
* ```hostname``` the senders entire hostname.
* ```speakername``` the name of the sender.
* ```botcommand``` the command sent by speakername.
* ```args``` any additional arguments to the command.


### Todo

* SSL
* Connection state
* Autojoin
* Nick Serv auth

#### Pull requests accepted!

### License

(The MIT License)

Copyright (c) 2013 Daniel Mills &lt;mills.dma@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
>>>>>>> 008fc6279338cfd601a1df3c09356c259d181fd0
