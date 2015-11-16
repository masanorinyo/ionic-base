'use strict';
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    reload = require("browser-sync").reload,
    gulpif = require('gulp-if'),
    cache = require('gulp-cache'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    chalk = require('chalk');


module.exports = gulp.task('images', function () {
  gutil.log(  chalk.green('[ IMAGE ] : '+chalk.bold('optimized')) );
  return gulp.src(config.paths.src.images)
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulpif( staging || production,
      gulp.dest(config.paths.dest.targets.images),
      gulp.dest(config.paths.dest.development.images)
    ))
    .pipe(reload({stream:true}))
    .pipe(size({ "title" : "image size"}));
});
