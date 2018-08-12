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
    files: [
      // Load the toolkit manifest.
      'app/extras/manifest.js',
      'test/test-launch/specs/*.js',
      { pattern: 'classic/**/*.js', included: false, watched: false }
    ],
    frameworks: ['jasmine', 'extjs-6'],
    logLevel: config.LOG_INFO,
    port: 9876,
    proxies: {
      // Proxy the source code.
      '/classic/': '/base/classic/',
      // Proxy the toolkit manifest.
      '/classic.json': '/base/classic.json'
    },
    reporters: ['progress'],
    singleRun: true
  });
};
