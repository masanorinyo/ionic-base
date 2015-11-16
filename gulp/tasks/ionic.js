"use strict";

var gulp = require('gulp'),
    shell = require('gulp-shell');

module.exports = gulp.task('ionic', [ 'ionic:serve','ionic:ios','ionic:android']);

module.exports = gulp.task('ionic:serve', shell.task([
  "ionic serve"
]));

module.exports = gulp.task('ionic:ios', shell.task([
  "ionic build ios",
  "ionic emulate ios"
]));

module.exports = gulp.task('ionic:android', shell.task([
  "ionic build android",
  "ionic emulate android"
]));