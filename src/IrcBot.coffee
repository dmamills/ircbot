net = require 'net'
Parser = require './Parser'
Messages = require './MessageTemplates'
Commander = require './Commander'
Pigeon = require './Pigeon'

module.exports = class IrcBot
  constructor: (options) ->
    @opt = options

    @opt.unknownCommand = options.unknownCommand || 'Command not known.';
    @nameRegex = new RegExp(@opt.nick)
    @parser = new Parser
    @commander = new Commander @opt.commands
    @pigeon = new Pigeon @opt.host,@opt.port, (@onConnect.bind @), (@onData.bind @)
  
  onData: (data) ->
    console.log data
    sd = data.split(' ')

    #store hostname
    if !@opt.hostname 
     @opt.hostname = sd[0].substr 1

    #if connected parse messages
    if @connected
      if /PING/.test(sd[0])
       @pigeon.send Messages.pong @opt.hostname

      if /PRIVMSG/.test(sd[1]) &&@nameRegex.test(data)
        messageArgs = @parser.parse data

        if /HELP/.test(data)
          @pigeon.reply messageArgs,@commander.help messageArgs
          return

        if /DESC/.test(data)
          @pigeon.reply messageArgs,@commander.helpCommand messageArgs.args.split(' ')[0]
          return

        console.log 'message ' + JSON.stringify messageArgs
        results = @commander.checkCommands messageArgs

        if results == undefined
          @pigeon.reply messageArgs,@opt.unknownCommand
        else
          @pigeon.sendResults results

      if /KICK/.test(data) && @nameRegex.test(data) && @opt.autojoin 
        @pigeon.send Messages.join data.split(' ')[2]  

    #The first message sent after client registration.
    if sd[1] == '001'
      @joinChannels()
      @connected = true

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