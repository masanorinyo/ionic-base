'use strict';

var gulp = require('gulp'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    dest;

if(production || staging){
  dest = config.paths.dest.targets.assets;
}else{
  dest = config.paths.dest.development.assets;
}

module.exports = gulp.task('asset', function () {
  gutil.log(  chalk.green('[ ASSET ] : '+chalk.bold('moved')) );
  return gulp.src(config.paths.src.assets)
    .pipe(gulp.dest(dest))
    .pipe(size({ "title" : "asset size"}));
});