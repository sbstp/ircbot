var glob = require('glob');
var path = require('path');
var watch = require('node-watch');
var fs = require('fs');

var basepath = path.join(__dirname, 'plugins');

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
glob.sync(path.join(basepath, '*.js')).forEach(function (path) {
  console.log(path, 'initial load');
  loadPlugin(path);
});

/*
 * Watch plugins folders.
 */
watch(basepath, function (filename) {
  fs.exists(filename, function (exists) {
    if (exists) {
      console.log(filename, 'added or modified');
      reloadPlugin(filename);
    } else {
      console.log(filename, 'deleted');
      unloadPlugin(filename);
    }
  });
});

exports.getPlugins = function () {
  return Object.keys(plugins).map(function (key) {
    return plugins[key];
  });
};
