net = require 'net'
Messages = require './MessageTemplates'

module.exports = class Pigeon
    @conn = null
    constructor: (host,port,onConnect,onData) ->
        @host = host
        @port = port
        @onConnect = onConnect
        @onData = onData
        @connect

    connect: ->
        @conn = net.connect {
            host: @host,
            port: @port
        }, @onConnect
        
        @conn.setEncoding 'utf-8'
        @conn.on 'data', @onData
        return

    sendResults: (results) ->
        for result in results
            console.log 'sending: ' + result
            @send result

    reply: (messageArgs,message) ->
        if messageArgs.isPrivate
            @send Messages.pvtMsg messageArgs.speakername,message
        else
            @send Messages.roomMsg messageArgs.roomname,message

    send: (message) ->
        @conn.write message + '\r\n'
        return