'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    util = require('util'),
    devip = require('dev-ip'),
    history = require('connect-history-api-fallback'),
    browserSyncConfig;


function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir == TMP_FOLDER || (util.isArray(baseDir) && baseDir.indexOf(SRC_FOLDER) != -1)) {
    routes = {
      // Should be '/bower_components': '../bower_components'
      // Waiting for https://github.com/shakyShane/browser-sync/issues/308
      '/bower_components': 'bower_components'
    };
  }

  
  browserSyncConfig = {
    startPath: '/',
    ghostMode: {
        clicks: ghostOn,
        forms: ghostOn,
        scroll: ghostOn
    },
    server: {
      baseDir: baseDir,
      routes: routes,
      middleware: history({
        verbose: false
      })
    },
    browser: browser,
    
    port: config.servers.ports.devServer
  };


  if(local){
    browserSyncConfig.open = "local";
  }else{
    browserSyncConfig.host = devip()[0];
    browserSyncConfig.open = "external";
  }

  browserSync.instance = browserSync.init(files, browserSyncConfig);

}

module.exports = gulp.task('serve', function () {
  browserSyncInit( config.servers.browserSyncConfig.initFiles, config.servers.browserSyncConfig.watchFiles );
});


// module.exports = gulp.task('serve:e2e', function () {
//   browserSyncInit(['client/src', '.tmp'], null, []);
// });

// module.exports = gulp.task('serve:e2e-build', function () {
//   browserSyncInit('client/build', null, []);
// });
