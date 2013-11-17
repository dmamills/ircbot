module.exports = Command;

function Command(regex,action) {
	this.regex = regex;
	this.action	= action;
};

Command.prototype.test = function(str) {
	return this.regex.test(str);
};

Command.prototype.action = function(str) {
	return this.action(str);
};