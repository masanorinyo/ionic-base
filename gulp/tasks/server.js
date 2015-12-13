'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    util = require('util'),
    devip = require('dev-ip'),
    history = require('connect-history-api-fallback'),
    runSequence = require('run-sequence'),
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
  if(production){
    runSequence('ionic:serve');
    if(ios) runSequence('ionic:build:ios');
    if(android) runSequence('ionic:build:android');
  }else if(staging){
    runSequence('ionic:serve');
    if(ios) runSequence('ionic:emulate:ios');
    if(android) runSequence('ionic:emulate:android');
  }else{
    browserSyncInit( config.servers.browserSyncConfig.initFiles, config.servers.browserSyncConfig.watchFiles );
    if(ios) runSequence('ionic:emulate:ios:watch');
    if(android) runSequence('ionic:emulate:android:watch');
  }
});


// module.exports = gulp.task('serve:e2e', function () {
//   browserSyncInit(['client/src', '.tmp'], null, []);
// });

// module.exports = gulp.task('serve:e2e-build', function () {
//   browserSyncInit('client/build', null, []);
// });
