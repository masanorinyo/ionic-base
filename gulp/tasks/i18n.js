'use strict';

var gulp = require('gulp'),
  size = require('gulp-size'),
  gutil = require('gulp-util'),
  chalk = require('chalk'),
  dest;

module.exports = gulp.task('i18n', function () {
  gutil.log(  chalk.green('[ I18N ] : '+chalk.bold('moved')) );
  if( staging || production ) {
    dest = config.paths.dest.targets.i18n;
  } else {
    dest = config.paths.dest.development.i18n;
  }
  return gulp.src(config.paths.src.i18n)
    .pipe(gulp.dest(dest))
    .pipe(size({ "title" : "i18n size"}));
});