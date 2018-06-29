Ext.define('Test.container.Viewport', {
  extend: 'Ext.container.Viewport',
  requires: [
    'Test.app.ViewportController'
  ],
  alias: 'widget.Viewport',
  controller: 'ViewportController'
});