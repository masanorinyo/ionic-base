"use strict"

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    size = require('gulp-size'),
    dest,
    jade = require('gulp-jade');

module.exports = gulp.task('entry', function() {

  if( staging || production ){
    dest = BUILD_FOLDER;
  }else{
    dest = TMP_FOLDER;
  }

  gulp.src(config.paths.src.index)
   
    //filter out unchanged partials, but it only works when watching
    .pipe(gulpif( staging || production,jade(),jade({pretty: true})))
    
    //save all the files
    .pipe(gulp.dest(dest));
});
