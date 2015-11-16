'use strict';

var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = require("browser-sync").reload,
    csso = require('gulp-csso'),
    size = require('gulp-size'),
    dest,
    css_dest,
    css_dest_name,
    sassStyle,
    css_src,
    gutil = require('gulp-util'),
    chalk = require('chalk');


if( staging || production ){
  css_dest = config.paths.dest.targets.scripts;
  css_dest_name = config.files.names.targets.styles  + ".css";
  sassStyle = "compressed";
  dest = config.paths.dest.targets.styles;
  css_src = css_dest + "/*.css";
}else{
  css_dest = config.paths.dest.development.scripts;
  css_dest_name = config.files.names.development.styles  + ".css";
  sassStyle = "nested";
  dest = config.paths.dest.development.styles;
  css_src = css_dest + "/*.css";
}

function getTimestamp(){
  return Math.floor(Date.now() / 1000);
}

module.exports = gulp.task('styles', function(){
  
  gutil.log(  chalk.green('[ STYLE ] : '+chalk.bold('sass compiled')) );
  
  return gulp.src(config.paths.src.stylesGlob)
    .pipe(gulpif( !staging && !production, sourcemaps.init()))
    .pipe(sass({
        outputStyle: sassStyle
      }))
    .on('error',  notify.onError(function (err) {
      return "Scss failed: "+err.message;
    }))
    .on('error',  function (err) {
      this.emit('end');
    })
    .pipe(gulpif( !staging && !production , sourcemaps.write({loadMaps: true})))
    .pipe(gulpif( staging || production, prefix("last 1 version", "> 1%", "ie 8", "ie 7")))
    .pipe(rename(css_dest_name))
    .pipe(gulpif( staging || production,csso()))
    .on('error',  notify.onError(function (err) {
      return "Scss failed: "+err.message;
    }))
    .on('error',  function (err) {
      this.emit('end');
    })
    .pipe(gulp.dest(dest))
    .pipe(reload({stream:true}))
    .pipe(size({ "title" : "style size"}));
});