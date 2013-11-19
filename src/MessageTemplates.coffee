module.exports = { 
  join: (room) -> 'JOIN ' + room
  pong: (servername) -> 'PONG :' + servername
  user: (nick,hostname,servername,realname) -> 'USER ' + nick + ' ' + hostname + ' ' + servername + ' ' + realname
  nick: (nick) -> 'NICK ' + nick
  pvtMsg: (nick,message) -> 'PRIVMSG ' + nick + ' :' + message
  roomMsg: (room,message) -> 'PRIVMSG ' + room + ' :' + message
  quit: (reason) -> 'QUIT :' + reason
  mode: (channel,mode,nick) -> 'MODE ' + channel + ' ' + mode + ' ' + nick
}