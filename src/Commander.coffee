{EventEmitter} = require 'events'

module.exports = class Commander extends EventEmitter
  constructor: (commands) ->
    @commands = commands
    for command in commands
        if command.regex.toString() === '/HELP/'
            throw 'Cannot use regex /HELP/'
        @on command.name,command.action

  checkCommands: (args) ->
    for command in @commands
      if command.test args.botcommand
        results = command.action args
        return results

  help: (args) ->
    results = []
    for command in @commands
      results.push command.name
    return 'Commands: ' + results.join(' ') + ' Send DESC <command name> for more info'

  helpCommand: (commandName) ->
    for command in @commands
        if commandName == command.name
            return command.description
    return 'Sorry Command name not found'