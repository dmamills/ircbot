{EventEmitter} = require 'events'

module.exports = class Commander extends EventEmitter
  constructor: (commands) ->
    for command in commands
        @on command.name,command.action