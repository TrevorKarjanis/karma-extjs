describe('When on ready,', function () {
  it('Ext is ready', function () {
    expect(Ext.isReady).toBeTruthy();
  });

  it('permissions are not yet defined', function () {
    var application = (window.Test && window.Test.getApplication());
    expect(application && application.getPermissions()).toBeFalsy();
  });
});
