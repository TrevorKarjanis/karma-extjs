/* eslint-env browser: false, node */
var path = require('path');
var initExtJs = function (config, helper) {
  var basePath = config.basePath;
  var extJsConfig = getExtJsConfig(config);
  var files = config.files;
  if (extJsConfig.microloader) {
    var microloader = 'bootstrap.js';
    if (extJsConfig.production) {
      microloader = 'microloader.js';
    }

    files.push(createPattern(microloader, true, basePath, helper));
  }

  files.push(
    createPattern(path.join(__dirname, 'adapter.js'), true, basePath, helper),
    // Ensure that assets can be served through the Web server.
    createPattern('**/*.css', false, basePath, helper),
    createPattern('**/*.gif', false, basePath, helper),
    createPattern('**/*.js', false, basePath, helper),
    createPattern('**/*.json', false, basePath, helper),
    createPattern('**/*.svg', false, basePath, helper),
    // Include file types for Font Awesome.
    createPattern('**/*.ttf', false, basePath, helper),
    createPattern('**/*.woff', false, basePath, helper),
    createPattern('**/*.woff2', false, basePath, helper)
  );

  applyIf(config.proxies, {
    // Assets are served from a directory called "base" that links to
    // the workspace directory.
    '/app/': '/base/app/',
    '/app.js': '/base/app.js',
    '/build/': '/base/build/',
    '/ext/': '/base/ext/',
    '/packages/': '/base/packages/'
  });
};

var getExtJsConfig = function (config) {
  var extJsConfig = (config.extJs || {});
  if (extJsConfig.onReady || (extJsConfig.autoStart === undefined)) {
    extJsConfig.autoStart = true;
  }

  if (extJsConfig.autoLaunch === undefined) {
    extJsConfig.autoLaunch = true;
  }

  if (extJsConfig.microloader === undefined) {
    extJsConfig.microloader = true;
  }

  extJsConfig.production = (extJsConfig.production || false);

  (config.client || (config.client = {})).extJs = {
    autoLaunch: extJsConfig.autoLaunch,
    autoStart: extJsConfig.autoStart,
    onReady: extJsConfig.onReady
  };

  return extJsConfig;
};

var createPattern = function (pattern, included, basePath, helper) {
  if (!path.isAbsolute(pattern)) {
    pattern = path.resolve(basePath, pattern);
  }

  return {
    pattern: helper.normalizeWinPath(pattern),
    included: included,
    served: true,
    watched: false
  };
};

var applyIf = function (destination, source) {
  for (var property in source) {
    if (source.hasOwnProperty(property) &&
                !destination.hasOwnProperty(property)) {
      destination[property] = source[property];
    }
  }
};

initExtJs.$inject = ['config', 'helper'];

module.exports = {
  'framework:extjs-6': ['factory', initExtJs]
};
