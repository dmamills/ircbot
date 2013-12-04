module.exports = { 
  join: (room) -> 'JOIN ' + room
  pong: (servername) -> 'PONG :' + servername
  user: (nick,mode,unused,realname) -> 'USER ' + nick + ' ' + mode + ' ' + unused + ' ' + realname
  nick: (nick) -> 'NICK ' + nick
  pvtMsg: (nick,message) -> 'PRIVMSG ' + nick + ' :' + message
  roomMsg: (room,message) -> 'PRIVMSG ' + room + ' :' + message
  quit: (reason) -> 'QUIT :' + reason
  mode: (channel,mode,nick) -> 'MODE ' + channel + ' ' + mode + ' ' + nick
  names: (channel) -> 'NAMES ' + channel
  topic: (channel,topic) -> 'TOPIC ' + channel + ' ' + topic 
  part: (channel) -> 'PART ' + channel
  oper: (name,password) -> 'OPER ' + name + ' ' + password
  squit: (server,reason) -> 'SQUIT ' + server + ' :' + reason
  list: (channel) -> if channel 'LIST ' + channel else 'LIST'
  invite: (nick,channel) -> 'INVITE ' + nick + ' ' + channel
  kick: (nick,channel) -> 'KICK ' + channel + ' ' + nick
  notice: (target,text) -> 'NOTICE ' + target + ' ' + text
  who: (mask) -> 'WHO ' + mask
  whois: (target) -> 'WHOIS ' + target
  whowas: (target) -> 'WHOWAS ' + target
  kill: (nick,comment) -> 'KILL ' + nick + ' ' + comment
  away: (text) -> 'AWAY :' + text
  
}