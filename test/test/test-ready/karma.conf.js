/* eslint-env node */
module.exports = function (config) {
  config.set({
    autoWatch: false,
    basePath: '../..',
    // Ensure that the Microloader has enough time to load resources.
    browserNoActivityTimeout: 30000,
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    exclude: [
      '**/karma.conf.js'
    ],
    extJs: {
      onReady: true
    },
    files: [
      // Load the toolkit manifest.
      'app/extras/manifest.js',
      'test/test-ready/specs/*.js',
      { pattern: 'classic/**/*.js', included: false, watched: false }
    ],
    frameworks: ['jasmine', 'extjs-6'],
    logLevel: config.LOG_INFO,
    port: 9876,
    proxies: {
      // Proxy the source code.
      '/classic/': '/base/classic/',
      // Proxy the toolkit manifest.
      '/classic.json': '/base/classic.json',
      '/node_modules/': '/base/node_modules/'
    },
    reporters: ['progress'],
    singleRun: true
  });
};
