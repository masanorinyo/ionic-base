exports.config = {
  
  //{{_INSERT_SELENIUM_ADDRESS_}}

  specs: [
    '../../e2e/**/*.spec.js',
    '../../e2e/*.js'
  ],

  multiCapabilities: [
  //{{_INSERT_BROWSER_}}
  ],

  baseUrl: '{{_TEST_ADDRESS_}}',

  maxSessions: 1,

  framework: 'jasmine2',

  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  allScriptsTimeout: 30000,

  params: {
    address: '{{_TEST_ADDRESS_}}'
  },
  
  onPrepare: function(){
    browser.driver.manage().window().maximize();
    browser.get('{{_TEST_ADDRESS_}}');
  }
};

