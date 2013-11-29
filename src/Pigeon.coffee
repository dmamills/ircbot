net = require 'net'

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

    send: (message) ->
        @conn.write message + '\r\n'
        return