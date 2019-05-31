/* eslint-env browser: false, node */
var fs = require('fs');
var path = require('path');
var initExtJs = function (config, helper) {
  var basePath = config.basePath;
  var extJsConfig = getExtJsConfig(config);
  var files = config.files;
  var microloader = extJsConfig.microloader;
  var embedded = (microloader && microloader.embedded);
  var proxies = config.proxies;
  if (extJsConfig.production) {
    // Test the production environment.
    if (!embedded) {
      files.push(createPattern('microloader.js', true, basePath, helper));
    }
  }
  else {
    // Test the development environment.
    if (microloader) {
      files.push(createPattern('bootstrap.js', true, basePath, helper));

      // Don't create a pattern unless the file exists in order to avoid a log
      // warning.
      if (embedded &&
        fs.existsSync(path.join(basePath, '.sencha/app/Boot.js'))) {
        files.push(createPattern('.sencha/app/Boot.js', false, basePath, helper));
      }
    }

    files.push(
      createPattern('app.js', false, basePath, helper),
      createPattern('{app,ext,node_modules/@sencha}/**/*.js', false, basePath, helper)
    );

    applyIf(proxies, {
      // Assets are served from a directory called "base" that links to
      // the workspace directory.
      '/.sencha/': '/base/.sencha/',
      '/app/': '/base/app/',
      '/app.js': '/base/app.js',
      '/build/': '/base/build/',
      '/ext/': '/base/ext/',
      '/node_modules/': '/base/node_modules/'
    });
  }

  if (microloader.split) {
    files.push(createPattern('framework.js', false, basePath, helper));
    applyIf(proxies, {
      '/framework.js': '/base/framework.js'
    });
  }

  files.push(
    createPattern(path.join(__dirname, 'adapter.js'), true, basePath, helper),
    createPattern('*.json', false, basePath, helper)
  );

  applyIf(proxies, {
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

  var microloader = extJsConfig.microloader;
  if ((microloader === true) || (microloader === undefined)) {
    extJsConfig.microloader = microloader = { embedded: false, split: false };
  }
  else if (typeof microloader === 'object') {
    if (microloader.embedded === undefined) {
      microloader.embedded = false;
    }

    if (microloader.split === undefined) {
      microloader.split = false;
    }
  }

  if (extJsConfig.split === undefined) {
    extJsConfig.split = false;
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
