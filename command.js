module.exports = Command;

function Command(name,description,regex,action) {
	this.name = name;
	this.description = description;
	this.regex = regex;
	this.action	= action;
}

Command.prototype.name = function() {
	return this.name;
};

Command.prototype.description = function() {
	return this.description;
};

Command.prototype.test = function(str) {
	return this.regex.test(str);
};

Command.prototype.action = function(str) {
	return this.action(str);
};