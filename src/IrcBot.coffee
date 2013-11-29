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

    if /001/.test(data)
     @joinChannels() 
    
    if /PING/.test(data)
     @pigeon.send Messages.pong @opt.hostname

    if /PRIVMSG/.test(data) &&@nameRegex.test(data)
      messageArgs = @parser.parse data

      if /HELP/.test(data)
        @reply messageArgs,@commander.help messageArgs
        return

      if /DESC/.test(data)
        @reply messageArgs,@commander.helpCommand messageArgs.args.split(' ')[0]
        return

      console.log 'message ' + JSON.stringify messageArgs
      results = @commander.checkCommands messageArgs
      if results != null || results != undefined
        @pigeon.sendResults results

    if /KICK/.test(data) && @nameRegex.test(data) && @opt.autojoin 
      @pigeon.send Messages.join data.split(' ')[2]  

    return

  onConnect: ->
    @pigeon.send Messages.user @opt.nick,' hostname ',' servername ',@opt.name
    @pigeon.send Messages.nick @opt.nick
    console.log 'connected.'
    return

  reply: (args,message) ->
    if args.isPrivate
      @pigeon.send Messages.pvtMsg args.speakername,message
    else
      @pigeon.send Messages.roomMsg args.roomname,message 
    return

  joinChannels: ->
    channels = @opt.channels
    for channel in channels
      @pigeon.send Messages.join channel
    return
  
  connect: ->
    @pigeon.connect()
    return