var gaze = require('gaze');
var glob = require('glob');
var path = require('path');

var basepath = path.join(__dirname, 'plugins/*.js');

var plugins = {};

function unloadPlugin(path) {
  delete plugins[path];
  delete require.cache[path];
}

function loadPlugin(path) {
  try {
    var module = require(path);
    plugins[path] = module;
  } catch (e) {
    console.log(e);
  }
}

function reloadPlugin(path) {
  unloadPlugin(path);
  loadPlugin(path);
}

/*
 * Load default plugins.
 */
glob.sync(basepath).forEach(function (path) {
  loadPlugin(path);
});

/*
 * Got to use polling for now, default watch does not seem to work
 * properly.
 */
gaze(basepath, {mode: 'poll', interval: '500'}, function (err, watcher) {

  watcher.on('changed', function (path) {
    console.log('changed', path);
    reloadPlugin(path);
  });

  watcher.on('added', function (path) {
    console.log('added', path);
    loadPlugin(path);
  });

  watcher.on('deleted', function (path) {
    console.log('deleted', path);
    unloadPlugin(path);
  });

});

exports.getPlugins = function () {
  return Object.keys(plugins).map(function (key) {
    return plugins[key];
  });
};
