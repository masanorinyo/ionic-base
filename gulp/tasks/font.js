'use strict';
var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    chalk = require('chalk');

gulp.task('custom-fonts', function () {
  return gulp.src(config.paths.src.fonts)
    .pipe(gulpif( staging || production,
      gulp.dest(config.paths.dest.targets.fonts),
      gulp.dest(config.paths.dest.development.fonts)
    ))
    .pipe(size());
})


gulp.task('bower-fonts', function () {
  return gulp.src(mainBowerFiles())
    .pipe(filter('**/*.{eot,svg,ttf,woff}'))
    .pipe(flatten())
    .pipe(gulpif( staging || production,
      gulp.dest(config.paths.dest.targets.bowerFonts),
      gulp.dest(config.paths.dest.development.bowerFonts)
    ))
    .pipe(size({ "title" : "font size"}));
})


module.exports = gulp.task('fonts', [ "custom-fonts", "bower-fonts" ],function(){
  gutil.log(  chalk.green('[ FONT ] : '+chalk.bold('moved to the right place')) );
});