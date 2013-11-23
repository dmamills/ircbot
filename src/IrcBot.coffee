net = require 'net'
Parser = require './Parser'
Messages = require './MessageTemplates'
Commander = require './Commander'
Pigeon = require './Pigeon'

module.exports = class IrcBot
  constructor: (options) ->
    @opt = options
    @nameRegex = new RegExp(@opt.nick)
    @parser = new Parser
    @commander = new Commander @opt.commands
    @pigeon = new Pigeon @opt.host,@opt.port, (@onConnect.bind @), (@onData.bind @)
  
  onData: (data) ->
    console.log data
    if !@opt.hostname 
     @opt.hostname = data.split(' ')[0].substr 1

    if /001/.test data
     @joinChannels() 
    
    if /PING/.test(data) 
     @pigeon.send Messages.pong @opt.hostname

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
          @pigeon.send result
        break
    return

  onConnect: ->
    @pigeon.send Messages.user @opt.nick,' hostname ',' servername ',@opt.name
    @pigeon.send Messages.nick @opt.nick
    console.log 'connected.'
    return

  joinChannels: ->
    channels = @opt.channels
    for channel in channels
      @pigeon.send Messages.join channel
    return
  
  connect: ->
    @pigeon.connect()
    return