Ext.define('Test.Application', {
  extend: 'Ext.app.Application',
  requires: [
    'Test.container.Viewport'
  ],
  appProperty: 'application',
  config: {
    permissions: null
  },
  mainView: 'Test.container.Viewport',

  launch: function () {
    // When implementing a launch method, the parent must be called to
    // automatically start testing when the application launches.
    this.callParent(arguments);
  }
});
