module.exports = class Parser
  constructor:->

  parse: (data)->
    splitData = data.trimRight(4).split ' '
    generateMessageArgs splitData,splitData[2][0] != '#'

  generateMessageArgs = (dataArr,isPrivate) ->
    speaker = dataArr[0].substr 1,dataArr[0].indexOf('!')-1
    hostname = dataArr[0].slice dataArr[0].indexOf('!')+2
    
    messageArgs = { 
           isPrivate:isPrivate 
           rawstring:dataArr.join(' '),
           hostname:hostname
           speakername:speaker
    }

    if !isPrivate
     messageArgs.roomname = dataArr[2]

    if (isPrivate && dataArr.length > 4) || (!isPrivate && dataArr.length > 5)
      messageArgs.args = if isPrivate then dataArr.slice(4).join(' ') else dataArr.slice(5).join(' ')

    messageArgs.botcommand = if isPrivate then dataArr[3].slice(1) else dataArr[4]
    return messageArgs