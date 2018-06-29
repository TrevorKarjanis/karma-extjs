describe('When ready, the namespace', function () {
  it('Ext is ready', function () {
    expect(Ext.isReady).toBeTruthy();
  }),

  it('Test is undefined', function () {
    expect(window.Test).toBeUndefined();
  });
});