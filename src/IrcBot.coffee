net = require 'net'
Parser = require './Parser'
Messages = require './MessageTemplates'

module.exports = class IrcBot
  constructor: (options) ->
    @opt = options
    @conn = null
    @nameRegex = new RegExp(@opt.nick)
    @parser = new Parser
  
  onData: (data) ->
    console.log data
    if !@opt.hostname 
     @opt.hostname = data.split(' ')[0].substr 1

    if /001/.test data
     @joinChannels() 
    
    if /PING/.test(data) 
     @sendMessage Messages.pong @opt.hostname

    if /PRIVMSG/.test(data) && @nameRegex.test(data)
      messageArgs = @parser.parse data
      console.log 'message ' + JSON.stringify messageArgs
      @testCommands messageArgs
    return

  testCommands: (args) ->
    commands = @opt.commands
    
    for command in commands
      if command.test args.botcommand
        results = command.action args
        for result in results
          console.log 'sending: ' + result
          @sendMessage result
        break
    return

  onConnect: ->
    @sendMessage Messages.user @opt.nick,'hostname','servername ',@opt.name
    @sendMessage Messages.nick @opt.nick
    console.log 'connected.'
    return

  joinChannels: ->
    channels = @opt.channels

    for channel in channels
      console.log 'JOINING ' + channel
      @sendMessage Messages.join channel
    return

  sendMessage: (message) ->
   @conn.write message + '\r\n'
   return

  connect: ->
    @conn = net.connect {
      host:@opt.host,
      port:@opt.port
    },@onConnect.bind @
    
    @conn.setEncoding 'utf-8'
    @conn.on 'data', @onData.bind @
    return