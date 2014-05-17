module.exports = function (bot, core, config) {

  var regex = /^\$quit\s?(\d+)?$/;

  var listener = function (nick, text, msg) {
    var match = text.match(regex);
    if (match) {
      process.exit(match[1] ? parseInt(match[1]) : 0);
    }
  };
  bot.on('pub', listener);

  // Return a destructor, will be called when plugin is unloaded (or reloaded)
  return function () {
    bot.removeListener('pub', listener);
  };
};
