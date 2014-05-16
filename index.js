var irc = require('irc')
  , manager = require('./manager');


var client = new irc.Client('irc.freenode.net', 'Crotchobald', {
  userName: 'Crotchobald',
  realName: 'Dr Crotchobald',
  channels: ['#SexManiac']
});

client.on('message#SexManiac', function (nick, text, message) {
  var ret, fn, plugins = manager.getPlugins();

  for (var i = 0; i < plugins.length; i++) {
    fn = plugins[i];
    if (typeof fn === 'function') {
      try {
        ret = fn(nick, text, message);
        if (ret !== undefined && ret !== false) {
          break;
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  ret && client.say('#SexManiac', ret);
});

client.on('error', function (err) {
  //console.log(err);
});
