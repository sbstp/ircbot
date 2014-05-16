module.exports = function (nick, text, message, client) {
  var match = text.match(/^\$say\s(.+)/);
  if (match) {
    return match[1];
  }
};
