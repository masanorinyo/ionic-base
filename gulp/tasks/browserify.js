'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'),
    browserifyShim = require('browserify-shim'),
    replace = require("gulp-replace"),
    uglify = require("gulp-uglify"),
	source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    size = require('gulp-size'),
    ngAnnotate = require("gulp-ng-annotate"),
    gutil = require('gulp-util'),
    chalk = require('chalk');

var targetString = "$logProvider.debugEnabled(true)",
    resultString = "$logProvider.debugEnabled(false)";

module.exports = gulp.task('browserify', function () {
  gutil.log(  chalk.green('[ BROWSERIFY ] : '+chalk.bold('Compilation completed')) );
  return browserify({
      entries: [config.paths.src.scriptsGlob]
    })
    .bundle()
    .pipe(source(config.files.names.targets.scripts + ".js"))
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(replace(targetString, resultString)) // this will turn off $log.debug
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dest.targets.scripts))
    .pipe(size({ "title" : "app size"}));

});
