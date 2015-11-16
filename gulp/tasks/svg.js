'use strict';

var gulp = require('gulp'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

module.exports = gulp.task('svg', function () {
  gutil.log(  chalk.green('[ SVG ] : '+chalk.bold('moved')) );
  return gulp.src(config.paths.src.svgs)
    .pipe(gulp.dest(config.paths.dest.targets.assets))
    .pipe(size({ "title" : "svg size"}));
});