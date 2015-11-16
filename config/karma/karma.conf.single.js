module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // base path, that will be used to resolve files and exclude
    basePath: '../../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      "src/bower_components/jquery/dist/jquery.min.js",
      "src/bower_components/ionic/js/ionic.bundle.min.js",
      "src/bower_components/angular-mocks/angular-mocks.js",
      "src/bower_components/platform/platform.js",
      "src/bower_components/localforage/dist/localforage.min.js",
      "src/bower_components/angular-localforage/dist/angular-localforage.min.js",
      "src/bower_components/lodash/dist/lodash.min.js",
      "www/app/constants*.js",
      ".tmp/app/constants*.js",
      'src/app/**/*.jade',
      "src/app/index.js"
    ],

    browserify: {
        watch: false,
        debug: false
    },

    preprocessors: {
      "src/app/**/*!(spec).js": ['browserify'],
      'src/app/**/*.jade': ['ng-jade2js']
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 4000,

    // Start these browsers, currently available:
    // - Chrome
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      "karma-chrome-launcher",
      "karma-nyan-reporter",
      "karma-browserify",
      "karma-ng-jade2js-preprocessor",
      'karma-notify-reporter'
    ],

    // progress, spec, dots
    reporters: ['nyan','notify'],

    // Optional Settings 
    notifyReporter: {
      reportEachFailure: true, 
      reportSuccess: true
    },

    // config for jade compiler
    ngJade2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'templateCache'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
