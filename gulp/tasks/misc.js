'use strict';

var gulp = require('gulp'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    dest;


if(production || staging){
  dest = config.paths.dest.targets.index;
}else{
  dest = config.paths.dest.development.index;
}

module.exports = gulp.task('misc',function () {
  gutil.log(  chalk.green('[ ASSET ] : '+chalk.bold('moved')) );
  return gulp.src(config.paths.src.misc)
    .pipe(gulp.dest(dest))
    .pipe(size({ "title" : "asset size"}));
});

module.exports = gulp.task('misc:data', function () {
  return gulp.src(config.paths.src.data)
    .pipe(gulp.dest(dest + "/data"))
    .pipe(size({ "title" : "asset size"}));
});