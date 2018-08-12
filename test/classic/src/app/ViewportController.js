Ext.define('Test.app.ViewportController', {
  extend: 'Ext.app.ViewController',
  requires: [
    // Ext JS
    'Ext.Ajax'
  ],
  alias: 'controller.ViewportController',

  init: function (view) {
    Ext.Ajax.request({
      url: 'permissions',
      method: 'GET',
      callback: this.permissionsRequestCallback,
      scope: this
    });
  },

  permissionsRequestCallback: function (options, success, response) {
    Test.getApplication().setPermissions([]);

    if (window.karma) {
      // This will start the test execution if autoStart is disabled.
      karma.loaded();
    }
  }
});
