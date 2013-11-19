var IrcBot = require('./lib/IrcBot'),
    Command = require('./lib/Command'),
    Messages = require('./lib/MessageTemplates')

module.exports = {
    Bot:IrcBot,
    Command:Command,
    Messages:Messages
};