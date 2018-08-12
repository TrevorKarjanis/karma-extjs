describe('When automatically launching, the application', function () {
  it('is defined', function () {
    expect(Test.getApplication()).toBeDefined();
  });

  it('has a viewport', function () {
    expect(Test.getApplication().getMainView().isViewport).toBeTruthy();
  });

  it('permissions are not yet defined', function () {
    expect(Test.getApplication().getPermissions()).toBeNull();
  });
});
