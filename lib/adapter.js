/* eslint-env es6: false */
/* global Ext */
(function () {
  var count = 0;
  var karma = window.__karma__;
  var loaded = karma.loaded;
  karma.loaded = function () {
    if (++count === 2) {
      loaded.call(karma);
    }
  };

  var config = karma.config.extJs;
  if (!config.autoLaunch) {
    overrideApplication();
  }

  var autoStart = config.autoStart;
  if (autoStart) {
    overrideOnReady();
  }
  else {
    // Define a public global karma object to provide abstraction.
    (window.karma || (window.karma = {})).loaded = karma.loaded;
  }

  function overrideApplication () {
    var applicationFn;
    var called = false;
    Object.defineProperty((Ext || (Ext = {})), 'application', {
      configurable: true,
      enumerable: true,

      get: function () {
        return function (config) {
          if (called) {
            return applicationFn.apply(this, arguments);
          }

          called = true;
        };
      },

      set: function (value) {
        return (applicationFn = value);
      }
    });
  }

  function overrideOnReady () {
    var onReadyCallback = function () {
      if (config.onReady) {
        karma.loaded();
      }
      else if (autoStart) {
        Ext.define('Karma.overrides.app.Application', {
          override: 'Ext.app.Application',

          launch: function () {
            this.callParent(arguments);
            karma.loaded();
          }
        });
      }
    };

    var onReadyFn;
    /* eslint no-global-assign: "off" */
    Object.defineProperty((Ext || (Ext = {})), 'onReady', {
      configurable: true,
      enumerable: true,

      get: function () {
        return onReadyFn;
      },

      set: function (value) {
        onReadyFn = value;
        if (onReadyFn) {
          onReadyFn.call(this, onReadyCallback);
        }
      }
    });
  }
}());
