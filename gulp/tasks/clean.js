'use strict';

var gulp = require('gulp'),
    del = require('del'),
    path,
    gutil = require('gulp-util'),
    exceptFor,
    chalk = require('chalk');

module.exports = gulp.task('clean', function (done) {
  gutil.log(  chalk.green('[ CLEAN ] : '+chalk.bold('cleaned .tmp folder')) );
  if( staging || production ){
    path = [BUILD_FOLDER + "/*",TMP_FOLDER + "/*"]; //
  }else{
    path = [TMP_FOLDER  + "/*"];
  }
  
  del(path,done);
});
