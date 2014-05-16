module.exports = function (nick, text, message, client) {
  var match = text.match(/^(\d+)\s\+\s(\d+)$/);
  if (match) {
    return parseInt(match[1], 10) + parseInt(match[2], 10);
  }
};
