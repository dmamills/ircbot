module.exports = class Command
  constructor: (name,description,regex,action) ->
    @name = name
    @description = description
    @regex = regex
    @action = action
  
  name: ->
    @name

  description: ->
    @description

  test: (str) ->
    @regex.test str

  action: (str) ->
    @action str