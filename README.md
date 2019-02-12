# karma-extjs

Test Ext JS applications with Karma and any of the available frameworks and plugins. This package provides a [Karma](https://karma-runner.github.io) plugin for [Ext JS](https://www.sencha.com/products/extjs/) applications, versions three to the latest, that starts test execution when the application is launched or as configured. It also pre-configures files and proxies for resource types and directories common in the Ext JS framework.

## Prerequisites

Install Karma and any required dependencies in Ext JS application directory. See the Karma [installation documentation](https://karma-runner.github.io/2.0/intro/installation.html).
```bash
npm install karma --save-dev
```

## Installation

Due to a conflict, the npm package name is karma-extjs-6.

```bash
npm install karma-extjs-6 --save-dev
```

## Configuration

See the test application in the [test directory](https://github.com/TrevorKarjanis/karma-extjs/tree/master/test) for an example.

### Integration Testing

See the Karma [configuration documentation](https://karma-runner.github.io/2.0/intro/configuration.html) to create a configuration for Karma, and include extjs-6 as a framework. By default, test execution will automatically start when the application launches.

#### Ext JS 4 - Latest

When using the [Microloader](http://docs.sencha.com/cmd/guides/microloader.html), the manifest and scripts should not be embedded in the index.html file.

1. If the application defines an Ext.app.Application.launch method, ensure it calls its parent.
2. Copy the before load manifest configuration into a script file (e.g. app/extras/manifest.js).
3. The manifest is not embedded by default. If the manifest is embedded, set the [embed configuration](http://docs.sencha.com/cmd/guides/microloader.html#microloader_-_embedded_manifest) to false in the app.json file.
3. Set the microloader embed configuration to false in the app.json file.
```json
"output": {
    "microloader": {
        "embed": false
    }
}
```
4. When testing a production build, set production to true.
5. Configure [file patterns](http://karma-runner.github.io/2.0/config/files.html) for all of the application, build, and package resources.
6. Configure a proxy for the toolkit manifest.
7. Configure proxies for the application source directories.
8. Configure browserNoActivityTimeout to account for the amount of time the application takes to load. Larger applications and development builds require more time.
```js
module.exports = function (config) {
  config.set({
    ...
    frameworks: ['jasmine', 'extjs-6'],
    ...
    files: [
      ...
      'app/extras/manifest.js',
	  '{build,classic,packages}/**/*.css'
    ],
    ...
    extJs: {
      production: true
    },
    ...
    proxies: {
	  '/classic/', '/base/classic/',
      '/classic.json': '/base/classic.json'
    },
    ...
    browserNoActivityTimeout: 20000
  });
};
```

#### Ext JS 3

Test Ext JS 3 applications with the onReady option. Test execution will start when the document and framework are ready.

```js
module.exports = function (config) {
  config.set({
    ...
    frameworks: ['jasmine', 'extjs-6'],
    ...
    extJs: {
      onReady: true
    }
  });
};
```

#### Custom

To start test execution at a distinct time disable autoStart, and call karma.loaded.

```js
module.exports = function (config) {
  config.set({
    ...
    frameworks: ['jasmine', 'extjs-6'],
    ...
    extJs: {
      autoStart: false
    }
    ...
  });
};
```
```js
  ...
  afterRenderHandler: function (viewport, eOpts) {
    if (window.karma) {
      window.karma.loaded();
	}
  },
  ...
```

### Unit Testing

#### Microloader

The Microloader can be also be used for unit testing. The application can be disabled to prevent conflicts between instances of a class. Classes can be loaded using Ext.require.

1. Follow the steps for configuring Karma for integration testing.
2. Set autoLaunch to false.
3. Set onReady to true.
```js
  extJs: {
    autoLaunch: false,
    onReady: true
  }
```
```js
describe('Fiddle.mixin.Test', {
  beforeAll(function (done) {
    Ext.require('Fiddle.mixin.Test', function () {
      done();
    });
  });

  it('is defined', function (done) {
    expect(Fiddle.mixin.Text).toBeDefined();
  });
  ...
```

## Usage

Start Karma as normal.

## Options

### autoStart

**Type:** Boolean **Default:** True

Specify true to start test execution automatically.

### autoLaunch

**Type:** Boolean **Default:** True

Specify true to allow the application to launch automatically.

### microloader

**Type:** Boolean/Object **Default:** True

Specify true or an object to use the Microloader (microloader.js).

### microloader.embedded

**Type:** Boolean **Default:** False

Specify true if the microloader is embedded. Embedding the microloader is not recommended.

### microloader.split

**Type:** Boolean **Default:** False

Specify true if the framework is split from the application (framework.js).

### onReady

**Type:** Boolean **Default:** False

Specify true to start test execution when the document and framework are ready. See the [documentation](https://docs.sencha.com/extjs/6.2.0/classic/Ext.html#method-onReady) for Ext.onReady.

### production

**Type:** Boolean **Default:** False

Specify true when testing the production environment.

## License

This project is license under the ISC License (ISC). See the LICENSE file.

## Authors

* Trevor Karjanis
