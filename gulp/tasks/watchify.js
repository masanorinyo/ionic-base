'use strict';

var gulp = require('gulp'),
    browserify = require("browserify"),
    watchify = require('watchify'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    gulpif = require("gulp-if"),
    source = require('vinyl-source-stream'),
    reload = require("browser-sync").reload,
    events = require('events'),
    notify = require('gulp-notify'),
    path = require('path');

module.exports = gulp.task('watchify', function () {
  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Browserify Options
    entries: [config.paths.src.scriptsGlob],
    extensions: ['.coffee', '.hbs'],
    debug: true
  });

  var bundle = function( changedFiles ) {
    gutil.log(  chalk.green('[Browserify] : '+chalk.bold('Compiled')) );
    return bundler
      .bundle()
      .on("error", function(err) {
        gutil.log("Browserify error:", err);
      })
      .pipe(source(config.files.names.development.scripts  + ".js"))
      .pipe(gulp.dest(config.paths.dest.development.scripts))
      .pipe(reload({stream:true}));
  };

  bundler = watchify(bundler);
  bundler.on('update', bundle);

  return bundle();
});


