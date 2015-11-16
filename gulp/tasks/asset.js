'use strict';

var gulp = require('gulp'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

module.exports = gulp.task('misc', function () {
  gutil.log(  chalk.green('[ ASSET ] : '+chalk.bold('moved')) );
  return gulp.src(config.paths.src.misc)
    .pipe(gulp.dest(config.paths.dest.targets.index))
    .pipe(size({ "title" : "asset size"}));
});