module.exports = function (nick, text, message) {
  var match = text.match(/^\$say\s(.+)/);
  if (match) {
    return match[1];
  }
};
