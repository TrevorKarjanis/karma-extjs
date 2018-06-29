Ext.define('Test.Application', {
  extend: 'Ext.app.Application',
  requires: [
    'Test.container.Viewport'
  ],
  appProperty: 'application',
  config: {
    permissions: null
  },
  mainView: 'Test.container.Viewport'
});