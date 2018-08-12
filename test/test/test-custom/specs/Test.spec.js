describe('With custom loading, the application', function () {
  it('is defined', function () {
    expect(Test.getApplication()).toBeDefined();
  });

  it('has a viewport', function () {
    expect(Test.getApplication().getMainView().isViewport).toBeTruthy();
  });

  it('permissions are defined.', function () {
    expect(Array.isArray(Test.getApplication().getPermissions())).toBeTruthy();
  });
});
