"use strict";

var gulp = require('gulp'),
    shell = require('gulp-shell');

module.exports = gulp.task('ionic', [ 'ionic:serve','ionic:build:ios','ionic:build:android']);

module.exports = gulp.task('ionic:serve', shell.task([
  "ionic serve"
]));

module.exports = gulp.task('ionic:build:ios', shell.task([
  "ionic build ios",
  "ionic emulate ios"
]));

module.exports = gulp.task('ionic:build:android', shell.task([
  "ionic build android",
  "ionic emulate android"
]));

module.exports = gulp.task('ionic:emulate:ios:watch', shell.task([
  "ionic build ios",
  "ionic emulate ios --livereload --consolelogs --serverlogs"
]));

module.exports = gulp.task('ionic:emulate:android:watch', shell.task([
  "ionic build android",
  "ionic emulate android --livereload --consolelogs --serverlogs"
]));

module.exports = gulp.task('ionic:emulate:ios', shell.task([
  "ionic build ios",
  "ionic emulate ios"
]));

module.exports = gulp.task('ionic:emulate:android', shell.task([
  "ionic build android",
  "ionic emulate android"
]));