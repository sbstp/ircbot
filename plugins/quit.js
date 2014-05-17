module.exports = function (nick, text, message, client) {
  var match = text.match(/^\$quit/);
  if (match) {
    process.exit(0);
  }
};
