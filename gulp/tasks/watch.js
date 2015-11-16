'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence');

module.exports = gulp.task('watch', function () {
  gulp.watch(config.paths.src.styles, ['styles'] );
  gulp.watch(config.paths.src.images, ['images'] );
  gulp.watch(config.paths.src.scripts, ['analysis' ,'sizereport']);
  gulp.watch(config.paths.src.templates, ['html'] );
  gulp.watch(config.paths.src.index, ['entry']);
  gulp.watch('bower.json', ['vendor']);
  gulp.watch(config.paths.dest.development.indexFile, ['inject']);
});