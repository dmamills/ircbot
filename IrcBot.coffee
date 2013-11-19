net = require 'net'
module.exports = IrcBot

class IrcBot
  constructor: (options) ->
    @opt = options
    @conn = null
    @nameRegex = new RegExp(@opt.nick)
  
  onData: (data) ->
    if !@opt.hostname 
     @opt.hostname = data.split(' ')[0].substr 1

    if /001/.test(data)      
     @joinChannels()

    if /PING/.test(data) 
     @sendMessage 'PONG :' + @opt.hostname

    if /PRIVMSG/.test(data) && @nameRegex.test(data)
     splitData = data.trimRight(4).split ' '
     messageArgs = @generateMessageArgs splitData,splitData[2][0] != '#'
     @parseMessage messasgeArgs
    return

  generateMessageArgs: (dataArr,isPrivate) ->
    speaker = dataArr[0].substr 1,dataArr[0].indexOf('!')-1
    hostname = dataArr[0].slice dataArr[0].indexOf('!')+2
    
    messageArgs = { 
           isPrivate:isPrivate 
           rawstring:dataArr.join(' '),
           hostname:hostname
           speakername:speakername
    }

    if !isPrivate
     messageArgs.roomname = dataArr[2]

    if (isPrivate && dataArr.length > 4) || (!isPrivate && dataArr.length > 5)
       messageArgs.args = (isPrivate) ? dataArr.slice(4).join ' ' : dataArr.slice(5).join ' '

       messageArgs.botcommand = (isPrivate) ? dataArr[3] : dataArr[4]
       messageArgs.botcommand = messageArgs.botcommand.slice 1

    return messageArgs

  parseMessage: (args) ->
    commands = @opt.commands
    console.log 'message #{ JSON.stringify args }'
    for command in commands
      if command.test args.botcommand
        results = command.action args
        for result in results
          console.log 'sending #{ result }'
          @sendMessage result
        break
    return

  onConnect: ->
    @sendMessage 'USER #{@opt.nick} hostname servername #{@opt.name}'
    @sendMessage 'NICK #{@opt.nick}'
    return

  joinChannels: ->
    channels = @opt.channels

    for channel in channels
      @sendMessage 'JOIN #{channel}'
    return

  sendMessage: (message) ->
    @conn.write message + '\r\n'
    return

  connect: ->
    @conn = net.connect {
      host:@opt.host,
      port:@opt.port
    },(data) ->
      console.log 'Connected.'
    @conn.setEncoding 'utf-8'
    @conn.on 'data', @onData.bind @
    @conn.on 'connect', @connect.bind @
    return

